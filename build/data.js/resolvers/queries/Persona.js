"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalPersonas = exports.obtenerPersonasSuperior = exports.obtenerPersonasCumple = exports.validarCedula = exports.obtenerPersona = exports.obtenerPersonasBarrio = exports.obtenerPersonas = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Persona = _interopRequireDefault(require("./../../models/Persona"));

var _assert = require("assert");

var _mongoose = _interopRequireDefault(require("mongoose"));

var obtenerPersonas =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(root, _ref) {
    var input, limite, offset, filtro, param, property, personsTipo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = _ref.input, limite = _ref.limite, offset = _ref.offset, filtro = _ref.filtro;

            if (!(filtro !== undefined)) {
              _context.next = 13;
              break;
            }

            if (input.totalFidelizados) {
              input['totalGeneral.totalFidelizados'] = {
                $gte: input.totalFidelizados
              };
              delete input['totalFidelizados'];
            }

            if (!(input.min && input.max)) {
              _context.next = 8;
              break;
            }

            input.edad = {
              $gte: input.min,
              $lte: input.max
            };
            delete input['min'];
            delete input['max'];
            return _context.abrupt("return", _Persona["default"].find(input));

          case 8:
            if (input.min) {
              input.edad = {
                $gte: input.min
              };
              delete input['min'];
            }

            if (input.max) {
              input.edad = {
                $lte: input.max
              };
              delete input['max'];
            }

            return _context.abrupt("return", _Persona["default"].find(input));

          case 13:
            if (!(Object.keys(input).length > 0)) {
              _context.next = 24;
              break;
            }

            param = {
              tipo: input.tipo
            };

            if (Object.getOwnPropertyNames(input).includes('nombre') || Object.getOwnPropertyNames(input).includes('cedula')) {
              property = Object.getOwnPropertyNames(input).includes('nombre') ? 'nombre' : 'cedula';
              param[property] = {
                $regex: new RegExp("^".concat(input[property]))
              };
            }

            _context.next = 18;
            return _Persona["default"].find(param).limit(limite).skip(offset);

          case 18:
            personsTipo = _context.sent;
            _context.next = 21;
            return _Persona["default"].countDocuments(param);

          case 21:
            personsTipo.total = _context.sent;
            console.log(personsTipo, 'asdasd');
            return _context.abrupt("return", personsTipo);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function obtenerPersonas(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.obtenerPersonas = obtenerPersonas;

var obtenerPersonasBarrio =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(root, _ref3) {
    var barrio, totalPersonasBarrio, totalPersonasFideBarrio;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            barrio = _ref3.barrio;
            _context2.next = 3;
            return _Persona["default"].countDocuments({
              barrio: barrio
            });

          case 3:
            totalPersonasBarrio = _context2.sent;
            _context2.next = 6;
            return _Persona["default"].countDocuments({
              barrio: barrio,
              fidelizado: true
            });

          case 6:
            totalPersonasFideBarrio = _context2.sent;
            return _context2.abrupt("return", {
              totalPersonasBarrio: totalPersonasBarrio,
              totalPersonasFideBarrio: totalPersonasFideBarrio
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function obtenerPersonasBarrio(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.obtenerPersonasBarrio = obtenerPersonasBarrio;

var obtenerPersona = function obtenerPersona(root, _ref5) {
  var id = _ref5.id;
  return new Promise(function (resolve, rejects) {
    _Persona["default"].findById({
      _id: id
    }, function (error, persona) {
      if (error) rejects(error);else resolve(persona);
    });
  });
};

exports.obtenerPersona = obtenerPersona;

var validarCedula = function validarCedula(root, _ref6) {
  var cedula = _ref6.cedula;
  console.log(cedula);
  return _Persona["default"].find({
    cedula: cedula
  });
};

exports.validarCedula = validarCedula;

var asyncObtenerPersonas = function asyncObtenerPersonas(param, limit, offset) {
  return _Persona["default"].find(param).limit(limit).skip(offset).exec();
};

var obtenerPersonasCumple =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var param, persons, cumple, fechaActual, dia, mes, anio, arrayCumple;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            param = {
              mensajeCumple: false //param['mensajeCumple'] = false;

            };
            _context3.next = 3;
            return asyncObtenerPersonas(param);

          case 3:
            persons = _context3.sent;
            cumple = '';
            fechaActual = new Date();
            dia = fechaActual.getDate(), mes = fechaActual.getMonth(), anio = fechaActual.getFullYear();
            arrayCumple = [];
            persons.map(function (person, i) {
              cumple = person.fechaCumple ? person.fechaCumple : '';

              if (cumple !== '') {
                if (cumple.getDate() + 1 === dia && mes === cumple.getMonth()) {
                  arrayCumple.push(person);
                  arrayCumple[arrayCumple.length - 1].edad = anio - cumple.getFullYear();
                }

                cumple = '';
              }
            });
            return _context3.abrupt("return", arrayCumple);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function obtenerPersonasCumple() {
    return _ref7.apply(this, arguments);
  };
}();

exports.obtenerPersonasCumple = obtenerPersonasCumple;

var obtenerPersonasSuperior = function obtenerPersonasSuperior(root, _ref8) {
  var input = _ref8.input;

  if (input && input.tipo) {
    return _Persona["default"].find({
      'superior.id': input.id,
      tipo: input.tipo
    });
  } else return _Persona["default"].find({
    'superior.id': input.id
  });
};

exports.obtenerPersonasSuperior = obtenerPersonasSuperior;

var totalPersonas = function totalPersonas(root, _ref9) {
  var input = _ref9.input,
      all = _ref9.all;
  if (all) return _Persona["default"].countDocuments({});
  var param = input.tipo ? {
    tipo: input.tipo
  } : {
    tipo: {
      $type: 7
    }
  };

  if (Object.keys(input).length > 1) {
    var property = Object.getOwnPropertyNames(input).includes('nombre') ? 'nombre' : 'cedula';
    param[property] = {
      $regex: new RegExp("^".concat(input[property]))
    };
  }

  return new Promise(function (resolve, rejects) {
    _Persona["default"].countDocuments(param, function (error, count) {
      if (error) rejects(error);else resolve(count);
    });
  });
};

exports.totalPersonas = totalPersonas;
//# sourceMappingURL=Persona.js.map
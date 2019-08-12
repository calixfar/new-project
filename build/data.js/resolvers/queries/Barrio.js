"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalBarrios = exports.topBarrios = exports.obtenerBarrio = exports.obtenerBarrios = exports.searchIdBarrio = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Barrio = _interopRequireDefault(require("./../../models/Barrio"));

var _Persona = _interopRequireDefault(require("./../../models/Persona"));

var _dns = require("dns");

var _assert = require("assert");

var _mongoose = require("mongoose");

var searchIdBarrio = function searchIdBarrio(root, _ref) {
  var nombre = _ref.nombre;
  console.log(nombre);
  return new Promise(function (resolve, rejects) {
    _Barrio["default"].findOne({
      nombre: nombre
    }, function (error, barrio) {
      if (error) rejects(error);else resolve(barrio);
    });
  });
};

exports.searchIdBarrio = searchIdBarrio;

var obtenerBarrios = function obtenerBarrios(root, _ref2) {
  var id = _ref2.id,
      input = _ref2.input,
      limit = _ref2.limit,
      offset = _ref2.offset;
  var zona = input && Object.keys(input).length > 0 ? input.zona : {
    $type: 7
  };
  return _Barrio["default"].find({
    zona: zona
  }).limit(limit).skip(offset);
};

exports.obtenerBarrios = obtenerBarrios;

var obtenerBarrio = function obtenerBarrio(root, _ref3) {
  var id = _ref3.id;
  return new Promise(function (resolve, rejects) {
    _Barrio["default"].findById(id, function (error, barrio) {
      if (error) rejects(error);else resolve(barrio);
    });
  });
};

exports.obtenerBarrio = obtenerBarrio;

var topBarrios =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(root, _ref4) {
    var zona, barrios, promisePerson, persons, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            zona = _ref4.zona;
            _context2.next = 3;
            return _Barrio["default"].find({
              zona: zona
            });

          case 3:
            barrios = _context2.sent;
            promisePerson = barrios.map(
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(barrio) {
                var promise;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Persona["default"].countDocuments({
                          fidelizado: true,
                          barrio: barrio.id
                        });

                      case 2:
                        promise = _context.sent;
                        return _context.abrupt("return", promise);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref6.apply(this, arguments);
              };
            }());
            _context2.next = 7;
            return Promise.all(promisePerson);

          case 7:
            persons = _context2.sent;
            res = persons.map(function (person, i) {
              return {
                id: barrios[i].id,
                nombre: barrios[i].nombre,
                votosFide: person
              };
            });
            return _context2.abrupt("return", res.sort(function (a, b) {
              return b.votosFide - a.votosFide;
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function topBarrios(_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}();

exports.topBarrios = topBarrios;

var totalBarrios = function totalBarrios(root, _ref7) {
  var input = _ref7.input;
  var zona = input && Object.keys(input).length > 0 ? input.zona : {
    $type: 7
  };
  return new Promise(function (resolve, rejects) {
    _Barrio["default"].countDocuments({
      zona: zona
    }, function (error, count) {
      if (error) rejects(error);else resolve(count);
    });
  });
};

exports.totalBarrios = totalBarrios;
//# sourceMappingURL=Barrio.js.map
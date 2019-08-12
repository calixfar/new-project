"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarBarrio = exports.crearBarrio = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Barrio = _interopRequireDefault(require("./../../models/Barrio"));

var _dns = require("dns");

var _assert = require("assert");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _Zona = require("../../models/Zona");

var _Persona = _interopRequireDefault(require("../../models/Persona"));

var crearBarrio = function crearBarrio(root, _ref) {
  var input = _ref.input;

  if (!input.id) {
    var nuevoBarrio = new _Barrio["default"]({
      nombre: input.nombre,
      cantidadVotantes: input.cantidadVotantes,
      metaVotos: input.metaVotos,
      zona: input.zona,
      estado: input.estado
    });
    nuevoBarrio.id = nuevoBarrio._id;
    return new Promise(function (resolve, rejects) {
      var update = {
        'id': nuevoBarrio._id
      };

      _Zona.Zona.updateOne({
        _id: input.zona
      }, {
        $push: {
          barrios: update
        }
      }, function (error) {
        if (error) rejects(error);else 'removido';
      });

      nuevoBarrio.save(function (error) {
        if (error) rejects(error);else resolve(nuevoBarrio);
      });
    });
  } else {
    return new Promise(function (resolve, rejects) {
      _Barrio["default"].findByIdAndUpdate({
        _id: input.id
      }, input, {
        "new": true
      }, function (error, barrio) {
        if (error) rejects(error);else resolve(barrio);
      });
    });
  }
};

exports.crearBarrio = crearBarrio;

var eliminarBarrio =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(root, _ref2) {
    var input, persons, promises;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = _ref2.input;
            _context2.next = 3;
            return _Persona["default"].find({
              barrio: input.barrio
            });

          case 3:
            persons = _context2.sent;
            promises = persons.map(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(person) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", _Persona["default"].findByIdAndUpdate({
                          _id: _mongoose["default"].Types.ObjectId(person.id)
                        }, {
                          $unset: {
                            'barrio': ''
                          }
                        }));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref4.apply(this, arguments);
              };
            }());
            Promise.all(promises); //Persona.updateMany({barrio: mongoose.Types.ObjectId(input.barrio)},{$unset: {barrio: ''}}, {multi: true})

            return _context2.abrupt("return", new Promise(function (resolve, rejects) {
              var update = {
                'id': input.barrio
              };
              console.log('update', update);

              _Zona.Zona.update({
                _id: input.zona
              }, {
                $pull: {
                  barrios: {
                    'id': _mongoose["default"].Types.ObjectId(input.barrio)
                  }
                }
              }, function (error) {
                if (error) rejects(error);
              });

              _Barrio["default"].findByIdAndDelete({
                _id: input.barrio
              }, function (error) {
                if (error) rejects(error);else resolve('Se elemino correctamente');
              });
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function eliminarBarrio(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.eliminarBarrio = eliminarBarrio;
//# sourceMappingURL=Barrio.js.map
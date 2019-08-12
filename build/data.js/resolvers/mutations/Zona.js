"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarZona = exports.actualizarZona = exports.crearZona = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Zona = require("../../models/Zona");

var _Barrio = require("../../models/Barrio");

var _mongoose = _interopRequireDefault(require("mongoose"));

var crearZona = function crearZona(root, _ref) {
  var input = _ref.input;
  console.log(input);
  var nuevaZona = new _Zona.Zona({
    barrios: input.barrios,
    nombre: input.nombre
  });
  nuevaZona.id = nuevaZona._id;
  return new Promise(function (resolve, rejects) {
    nuevaZona.save(function (error) {
      if (error) rejects(error);else resolve(nuevaZona);
    });
  });
};

exports.crearZona = crearZona;

var actualizarZona = function actualizarZona(root, _ref2) {
  var input = _ref2.input;
  return new Promise(function (resolve, rejects) {
    _Zona.Zona.findOneAndUpdate({
      _id: input.id
    }, input, {
      "new": true
    }, function (error, zona) {
      if (error) rejects(error);else resolve(zona);
    });
  });
};

exports.actualizarZona = actualizarZona;

var eliminarZona =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(root, _ref3) {
    var id, zona;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref3.id;
            console.log(id);
            _context2.next = 4;
            return _Zona.Zona.findById({
              _id: id
            });

          case 4:
            zona = _context2.sent;
            // console.log('ziba',zona)
            zona.barrios.map(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(idBarrio) {
                var promise;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Barrio.Barrio.findByIdAndDelete({
                          _id: id
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
                return _ref5.apply(this, arguments);
              };
            }()); // return new Promise((resolve, rejects) => {
            //     Zona.findOneAndDelete({_id : id}, (error) => {
            //         if (error) rejects(error)
            //         else resolve('Se elimino correctamente')
            //     })
            // })

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function eliminarZona(_x, _x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.eliminarZona = eliminarZona;
//# sourceMappingURL=Zona.js.map
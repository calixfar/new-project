"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autenticarUsuario = exports.crearUsuario = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Usuario = _interopRequireDefault(require("./../../models/Usuario"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

_dotenv["default"].config({
  path: 'variables.env'
});

var crearToken = function crearToken(usuarioLogin, secreto, expiresIn) {
  var usuario = usuarioLogin.usuario;
  return _jsonwebtoken["default"].sign({
    usuario: usuario
  }, secreto, {
    expiresIn: expiresIn
  });
};

var crearUsuario =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(root, _ref) {
    var usuario, password, nombre, rol, existeUsuario, nuevoUsuario;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            usuario = _ref.usuario, password = _ref.password, nombre = _ref.nombre, rol = _ref.rol;
            _context.next = 3;
            return _Usuario["default"].findOne({
              usuario: usuario
            });

          case 3:
            existeUsuario = _context.sent;

            if (!existeUsuario) {
              _context.next = 6;
              break;
            }

            throw new Error('El usuario ya existe');

          case 6:
            _context.next = 8;
            return new _Usuario["default"]({
              usuario: usuario,
              password: password,
              nombre: nombre,
              rol: rol,
              active: false
            }).save();

          case 8:
            nuevoUsuario = _context.sent;
            return _context.abrupt("return", 'Creado correctamente');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function crearUsuario(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.crearUsuario = crearUsuario;

var autenticarUsuario =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(root, _ref3) {
    var usuario, password, nombreUsuario, passwordCorrecto;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            usuario = _ref3.usuario, password = _ref3.password;
            _context2.next = 3;
            return _Usuario["default"].findOne({
              usuario: usuario
            });

          case 3:
            nombreUsuario = _context2.sent;

            if (nombreUsuario) {
              _context2.next = 6;
              break;
            }

            throw new Error('El usuario o la contraseña están incorrectos');

          case 6:
            _context2.next = 8;
            return _bcrypt["default"].compare(password, nombreUsuario.password);

          case 8:
            passwordCorrecto = _context2.sent;

            if (passwordCorrecto) {
              _context2.next = 11;
              break;
            }

            throw new Error('El usuario o la contraseña están incorrectos');

          case 11:
            return _context2.abrupt("return", {
              token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function autenticarUsuario(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.autenticarUsuario = autenticarUsuario;
//# sourceMappingURL=Usuario.js.map
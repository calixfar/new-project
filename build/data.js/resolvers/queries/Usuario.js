"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerUsuario = void 0;

var _Usuario = _interopRequireDefault(require("./../../models/Usuario"));

var obtenerUsuario = function obtenerUsuario(root, args, _ref) {
  var usuarioActual = _ref.usuarioActual;

  if (!usuarioActual) {
    return null;
  }

  var usuario = _Usuario["default"].findOne({
    usuario: usuarioActual.usuario
  });

  return usuario;
};

exports.obtenerUsuario = obtenerUsuario;
//# sourceMappingURL=Usuario.js.map
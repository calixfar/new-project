"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = require("./../db");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

(0, _db.conectar)();
var usuario = new _mongoose["default"].Schema({
  usuario: String,
  password: String,
  nombre: String,
  rol: String,
  active: Boolean
}); //hashear los passwords

usuario.pre('save', function (next) {
  var _this = this;

  //si el password no esta modificado
  if (!this.isModified('password')) {
    return next();
  }

  _bcrypt["default"].genSalt(10, function (error, salt) {
    if (error) next(error);

    _bcrypt["default"].hash(_this.password, salt, function (error, hash) {
      if (error) next(error);
      _this.password = hash;
      next();
    });
  });
});

var Usuario = _mongoose["default"].model('usuarios', usuario);

var _default = Usuario;
exports["default"] = _default;
//# sourceMappingURL=Usuario.js.map
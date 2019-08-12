"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zona = void 0;

var _db = require("./../db");

var _mongoose = _interopRequireDefault(require("mongoose"));

(0, _db.conectar)();
var zonaSchema = new _mongoose["default"].Schema({
  barrios: Array,
  nombre: String
});

var Zona = _mongoose["default"].model('zonas', zonaSchema);

exports.Zona = Zona;
//# sourceMappingURL=Zona.js.map
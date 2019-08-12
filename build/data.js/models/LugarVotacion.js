"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("./../db");

var _mongoose = _interopRequireDefault(require("mongoose"));

(0, _db.conectar)();
var schemaLugarVotacion = new _mongoose["default"].Schema({
  nombre: String,
  censoMujeres: Number,
  censoHombres: Number,
  potencial: Number,
  mesas: Array
});
var LugarVotacion = new _mongoose["default"].model('lugarVotacion', schemaLugarVotacion);
var _default = LugarVotacion;
exports["default"] = _default;
//# sourceMappingURL=LugarVotacion.js.map
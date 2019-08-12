"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("./../db");

var _mongoose = _interopRequireWildcard(require("mongoose"));

(0, _db.conectar)();
var barrioSchema = new _mongoose["default"].Schema({
  nombre: String,
  cantidadVotantes: Number,
  metaVotos: Number,
  zona: _mongoose["default"].Types.ObjectId,
  estado: String
});

var Barrio = _mongoose["default"].model('barrios', barrioSchema);

var _default = Barrio;
exports["default"] = _default;
//# sourceMappingURL=Barrio.js.map
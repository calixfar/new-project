"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerZona = exports.obtenerZonas = void 0;

var _Zona = require("./../../models/Zona");

var _url = require("url");

var _assert = require("assert");

var obtenerZonas = function obtenerZonas(root, _ref) {
  var input = _ref.input,
      limit = _ref.limit,
      offset = _ref.offset;
  return _Zona.Zona.find({}).limit(limit).skip(offset);
};

exports.obtenerZonas = obtenerZonas;

var obtenerZona = function obtenerZona(root, _ref2) {
  var id = _ref2.id;
  return new Promise(function (resolve, rejects) {
    _Zona.Zona.findById(id, function (error, zona) {
      if (error) rejects(error);else resolve(zona);
    });
  });
};

exports.obtenerZona = obtenerZona;
//# sourceMappingURL=Zona.js.map
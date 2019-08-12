"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crearLugarVotacion = void 0;

var _LugarVotacion = _interopRequireDefault(require("./../../models/LugarVotacion"));

var crearLugarVotacion = function crearLugarVotacion(root, _ref) {
  var input = _ref.input;
  console.log(input);
  var potencial = input.censoMujeres + input.censoHombres;
  console.log(potencial);
  var nuevoLugarVotacion = new _LugarVotacion["default"]({
    nombre: input.nombre,
    censoMujeres: input.censoMujeres,
    censoHombres: input.censoHombres,
    potencial: potencial
  });
  nuevoLugarVotacion.id = nuevoLugarVotacion._id;
  return new Promise(function (resolve, rejects) {
    nuevoLugarVotacion.save(function (error) {
      if (error) rejects(error);else resolve(nuevoLugarVotacion);
    });
  });
};

exports.crearLugarVotacion = crearLugarVotacion;
//# sourceMappingURL=LugarVotacion.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _assert = require("assert");

var _Zona = require("./mutations/Zona");

var _Zona2 = require("./queries/Zona");

var _Barrio = require("./mutations/Barrio");

var _Barrio2 = require("./queries/Barrio");

var _Persona = require("./mutations/Persona");

var _Persona2 = require("./queries/Persona");

var _Usuario = require("./mutations/Usuario");

var _Usuario2 = require("./queries/Usuario");

var _LugarVotacion = require("./mutations/LugarVotacion");

//import Barrio
//import persona
//Usuarios
//import LugarVotacion
var resolvers = {
  Query: {
    obtenerZonas: _Zona2.obtenerZonas,
    obtenerZona: _Zona2.obtenerZona,
    obtenerBarrios: _Barrio2.obtenerBarrios,
    obtenerBarrio: _Barrio2.obtenerBarrio,
    searchIdBarrio: _Barrio2.searchIdBarrio,
    totalBarrios: _Barrio2.totalBarrios,
    obtenerPersonas: _Persona2.obtenerPersonas,
    totalPersonas: _Persona2.totalPersonas,
    obtenerPersona: _Persona2.obtenerPersona,
    obtenerPersonasSuperior: _Persona2.obtenerPersonasSuperior,
    obtenerPersonasCumple: _Persona2.obtenerPersonasCumple,
    validarCedula: _Persona2.validarCedula,
    obtenerUsuario: _Usuario2.obtenerUsuario,
    obtenerPersonasBarrio: _Persona2.obtenerPersonasBarrio,
    topBarrios: _Barrio2.topBarrios
  },
  Mutation: {
    actualizarPersona: _Persona.actualizarPersona,
    crearZona: _Zona.crearZona,
    actualizarZona: _Zona.actualizarZona,
    eliminarZona: _Zona.eliminarZona,
    crearBarrio: _Barrio.crearBarrio,
    eliminarBarrio: _Barrio.eliminarBarrio,
    crearPersona: _Persona.crearPersona,
    eliminarPersona: _Persona.eliminarPersona,
    enviarSMS: _Persona.enviarSMS,
    registroMasivoPersonas: _Persona.registroMasivoPersonas,
    crearUsuario: _Usuario.crearUsuario,
    autenticarUsuario: _Usuario.autenticarUsuario,
    crearLugarVotacion: _LugarVotacion.crearLugarVotacion
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=index.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = require("./../db");

(0, _db.conectar)();
var personaSchema = new _mongoose["default"].Schema({
  cedula: String,
  nombre: String,
  apellido: String,
  fechaCumple: Date,
  estadoCivil: String,
  ocupacion: String,
  perfil: String,
  celular: String,
  direccion: String,
  correo: String,
  tipo: String,
  edad: Number,
  zona: _mongoose["default"].Types.ObjectId,
  barrio: _mongoose["default"].Types.ObjectId,
  lugarVotacion: String,
  mesaVotacion: Number,
  metaVotos: Number,
  estadoContacto: String,
  fidelizado: Boolean,
  tipoVoto: String,
  mensajeCumple: {
    type: Boolean,
    "default": false
  },
  dinero: String,
  genero: String,
  superior: Object,
  macros: Array,
  lideres: Array,
  multip: Array,
  votantes: Array,
  totalPersonas: Number,
  totalFidelizados: Number,
  totalGeneral: {
    totalPersonas: {
      type: Number,
      "default": 0
    },
    totalFidelizados: {
      type: Number,
      "default": 0
    },
    totalGeneralLideres: {
      totalPersonas: {
        type: Number,
        "default": 0
      },
      totalFidelizados: {
        type: Number,
        "default": 0
      }
    },
    totalGeneralMacros: {
      totalPersonas: {
        type: Number,
        "default": 0
      },
      totalFidelizados: {
        type: Number,
        "default": 0
      }
    },
    totalGeneralMultip: {
      totalPersonas: {
        type: Number,
        "default": 0
      },
      totalFidelizados: {
        type: Number,
        "default": 0
      }
    },
    totalGeneralVotantes: {
      totalPersonas: {
        type: Number,
        "default": 0
      },
      totalFidelizados: {
        type: Number,
        "default": 0
      }
    }
  }
});

var Persona = _mongoose["default"].model('personsas', personaSchema);

var _default = Persona;
exports["default"] = _default;
//# sourceMappingURL=Persona.js.map
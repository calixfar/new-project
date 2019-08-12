"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actualizarPersona = exports.eliminarPersona = exports.crearPersona = exports.enviarSMS = exports.registroFromExcel = exports.registroMasivoPersonas = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Persona = _interopRequireDefault(require("./../../models/Persona"));

var _assert = require("assert");

var _url = require("url");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _twilio = _interopRequireDefault(require("twilio"));

var barrios = function barrios() {
  return Barrio.find({}).exec();
};

var validarCedula = function validarCedula(cedula) {
  return _Persona["default"].find({
    cedula: cedula
  }).exec();
};

var registroMasivoPersonas =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(root, input) {
    var promises, results, errors;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(input);
            promises = input.input.datos.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(person, i) {
                var res;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return validarCedula(person.cedula);

                      case 2:
                        res = _context.sent;
                        return _context.abrupt("return", res);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 4;
            return Promise.all(promises);

          case 4:
            results = _context2.sent;
            console.log('object', results);
            errors = input.input.datos.map(function (person, i) {
              if (results[i].length === 0) {
                console.log('entro con: ' + person.cedula);
                personaNueva(person);
              } else {
                console.log('entro al error');
                return person;
              }
            });
            console.log('errorrs', errors);
            return _context2.abrupt("return", errors);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function registroMasivoPersonas(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.registroMasivoPersonas = registroMasivoPersonas;

var registroFromExcel =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(root, input) {
    var arrayError, register;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            arrayError = [];

            register =
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4() {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        input.input.datos.map(
                        /*#__PURE__*/
                        function () {
                          var _ref5 = (0, _asyncToGenerator2["default"])(
                          /*#__PURE__*/
                          _regenerator["default"].mark(function _callee3(person) {
                            var resultFindCedula, persona;
                            return _regenerator["default"].wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    _context3.next = 2;
                                    return validarCedula(person.cedula);

                                  case 2:
                                    resultFindCedula = _context3.sent;

                                    if (resultFindCedula.length === 0) {
                                      persona = personaNueva(person);
                                      console.log('repuessta persona', persona);
                                    } else {
                                      console.log('retorno'); // console.log('error')

                                      arrayError.push(person);
                                      console.log(arrayError);
                                    }

                                    resultFindCedula = '';

                                  case 5:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3);
                          }));

                          return function (_x7) {
                            return _ref5.apply(this, arguments);
                          };
                        }());
                        console.log('error', arrayError);

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function register() {
                return _ref4.apply(this, arguments);
              };
            }();

            register();

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function registroFromExcel(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.registroFromExcel = registroFromExcel;

var enviarSMS = function enviarSMS(root, _ref6) {
  var input = _ref6.input;
  var accountSid = 'AC05f4e20a2fd1c613909e39e37066316d'; // Your Account SID from www.twilio.com/console

  var authToken = 'b8d6f66481f92501ad2f2c41ed47fa7f';
  var client = new _twilio["default"](accountSid, authToken); //let to= `+57${input.celular}`
  //console.log(to)

  client.messages.create({
    body: "".concat(input.nombre, ", el equipo de trabajo de Firme por Aguachica te desea muchas felicidades y bendiciones en tu cumplea\xF1o n\xFAmero ").concat(input.edad, ", gracias por hacer parte de este proyecto."),
    to: "+57".concat(input.to),
    // Text this number
    from: '+18166056578' // From a valid Twilio number

  }).then(function (message) {
    console.log(message.sid);

    _Persona["default"].findByIdAndUpdate({
      _id: _mongoose["default"].Types.ObjectId(input.id)
    }, {
      mensajeCumple: true
    }, function () {
      (function (error) {
        if (error) console.log(error);else 'enviado y actualizado';
      });
    });
  });
};

exports.enviarSMS = enviarSMS;

var calcularEdad = function calcularEdad(cumple) {
  if (cumple) {
    var birthday = new Date(cumple);
    var actual = new Date();
    var day = actual.getDate(),
        mes = actual.getMonth();
    var descuento = false,
        edad = actual.getFullYear() - birthday.getFullYear();
    var edadSinDes = edad;

    if (mes <= birthday.getMonth()) {
      edad -= 1;

      if (mes === birthday.getMonth() && birthday.getDate() + 1 <= day) {
        edad += 1;
      }
    }

    return edad;
  }
};

var personaNueva = function personaNueva(input) {
  var nuevaPersona = new _Persona["default"]({
    cedula: input.cedula,
    nombre: input.nombre,
    apellido: input.apellido,
    fechaCumple: input.fechaCumple,
    estadoCivil: input.estadoCivil,
    ocupacion: input.ocupacion,
    expectativaOcupacion: input.expectativaOcupacion,
    celular: input.celular,
    direccion: input.direccion,
    correo: input.correo,
    edad: calcularEdad(input.fechaCumple),
    tipo: input.tipo,
    zona: input.zona,
    barrio: input.barrio ? input.barrio : null,
    lugarVotacion: input.lugarVotacion,
    mesaVotacion: input.mesaVotacion,
    metaVotos: input.metaVotos,
    estadoContacto: input.estadoContacto,
    genero: input.genero,
    dinero: input.dinero,
    fidelizado: input.fidelizado,
    tipoVoto: input.tipoVoto,
    superior: input.superior,
    perfil: input.perfil,
    macros: input.macros,
    lideres: input.lideres,
    multip: input.mulip,
    votantes: input.votantes,
    totalGeneral: input.totalGeneral
  });
  nuevaPersona.id = nuevaPersona._id; // nuevaPersona.totalGeneral= {
  //     totalGeneralLideres: {
  //         totalPersonas: 0,
  //         totalFidelizados: 0
  //     } ,
  //     totalGeneralMacros: {
  //         totalPersonas: 0,
  //         totalFidelizados: 0
  //     } ,
  //     totalGeneralMultip: {
  //         totalPersonas: 0,
  //         totalFidelizados: 0
  //     } ,
  //     totalGeneralVotantes: {
  //         totalPersonas: 0,
  //         totalFidelizados: 0
  //     }  
  // }

  nuevaPersona.save(function (error) {
    return error ? error : nuevaPersona;
  });
  return nuevaPersona;
};

var crearPersona = function crearPersona(root, _ref7) {
  var input = _ref7.input;
  crearPersona_ActualiarTotalGeneral(input);
}; // Saber a que grupo de los generales pertenece
//Recibe dos parametros 1. el tipo y 2. Para que clase de campo estará dirigido


exports.crearPersona = crearPersona;

var tipoGrupo = function tipoGrupo(tipo, general) {
  if (general) {
    return tipo === 'lider' ? 'totalGeneralLideres' : tipo === 'macro' ? 'totalGeneralMacros' : tipo === 'multiplicador' ? 'totalGeneralMultip' : 'totalGeneralVotantes';
  } else {
    return tipo === 'lider' ? 'lideres' : tipo === 'macro' ? 'macros' : tipo === 'multiplicador' ? 'multip' : 'votantes';
  }
}; //const tipoGrupoTotales = (tipo) => 
// Saber si una persona esta fidelizada o no 


var fidelizado = function fidelizado(valor) {
  return valor ? 1 : 0;
}; //metodo general para ejecutar crear personay actualizar totales directos y generales


var crearPersona_ActualiarTotalGeneral =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(input) {
    var nuevaPersona, tipo, idSuperior, fidelizados, queryCampo, queryInc, queryInc2, tipoGrupoGeneral, superiorDirecto, superior, validarSuperior, cont, antSuperior, nextSuperior;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            nuevaPersona = personaNueva(input);
            console.log('nueva Persona', nuevaPersona); //validar si la persona tiene un superior

            if (!(Object.keys(nuevaPersona.superior).length > 0)) {
              _context6.next = 44;
              break;
            }

            tipo = nuevaPersona.tipo;
            idSuperior = nuevaPersona.superior.id; // cambios totales directos

            fidelizados = fidelizado(nuevaPersona.fidelizado);
            queryCampo = {}, queryInc = {}, queryInc2 = {};
            tipoGrupoGeneral = tipoGrupo(nuevaPersona.tipo, true);
            queryCampo[tipoGrupo(tipo, false)] = {
              'id': nuevaPersona._id
            };
            queryInc['totalPersonas'] = 1;
            queryInc['totalFidelizados'] = fidelizados;
            queryInc["totalGeneral.".concat(tipoGrupoGeneral, ".totalFidelizados")] = fidelizados;
            queryInc["totalGeneral.".concat(tipoGrupoGeneral, ".totalPersonas")] = 1;
            queryInc['totalGeneral.totalPersonas'] = 1;
            queryInc['totalGeneral.totalFidelizados'] = fidelizados;
            queryInc2['totalGeneral.totalPersonas'] = 1;
            queryInc2['totalGeneral.totalFidelizados'] = fidelizados;
            queryInc2["totalGeneral.".concat(tipoGrupoGeneral, ".totalFidelizados")] = fidelizados;
            queryInc2["totalGeneral.".concat(tipoGrupoGeneral, ".totalPersonas")] = 1;

            _Persona["default"].findByIdAndUpdate({
              _id: idSuperior
            }, {
              $push: queryCampo,
              $inc: queryInc
            }, function (error) {
              if (error) return error;
            }); //Cambios totales generales


            _context6.next = 22;
            return findSuperior(_mongoose["default"].Types.ObjectId(idSuperior));

          case 22:
            superiorDirecto = _context6.sent;
            //console.log('superiorDirecto',superiorDirecto)
            superior = '', validarSuperior = true, cont = 0, antSuperior = true;
            nextSuperior = true;

          case 25:
            if (!(cont === 0 && superiorDirecto.superior)) {
              _context6.next = 34;
              break;
            }

            _context6.next = 28;
            return findSuperior(_mongoose["default"].Types.ObjectId(superiorDirecto.superior.id));

          case 28:
            superior = _context6.sent;
            antSuperior = superior;

            _Persona["default"].findByIdAndUpdate({
              _id: superior.id
            }, {
              $inc: queryInc2
            }, function (error) {
              return error ? error : true;
            });

            cont++; //nextSuperior = superior.superior ? true : false;
            //console.log('ant dentro del cont', antSuperior)
            //}

            _context6.next = 43;
            break;

          case 34:
            if (!antSuperior) {
              _context6.next = 43;
              break;
            }

            //console.log('ant', antSuperior)
            validarSuperior = antSuperior.superior ? true : false;

            if (!validarSuperior) {
              _context6.next = 43;
              break;
            }

            _context6.next = 39;
            return findSuperior(_mongoose["default"].Types.ObjectId(antSuperior.superior.id));

          case 39:
            superior = _context6.sent;

            //console.log('supercon', superior)
            _Persona["default"].findByIdAndUpdate({
              _id: superior.id
            }, {
              $inc: queryInc2
            }, function (error) {
              return error ? error : true;
            });

            cont++;
            antSuperior = superior;

          case 43:
            if (validarSuperior) {
              _context6.next = 25;
              break;
            }

          case 44:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function crearPersona_ActualiarTotalGeneral(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

var findSuperior = function findSuperior(id) {
  return _Persona["default"].findById({
    '_id': id
  }).exec();
};

var mainFindSuperior =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(id) {
    var person, _fidelizado, queryCampo, tipo;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return findSuperior(id);

          case 2:
            person = _context7.sent;

            _Persona["default"].updateMany({
              'superior.id': id
            }, {
              $unset: {
                superior: ''
              }
            }, {
              multi: true
            }, function (error) {
              if (error) return error;
            });

            _Persona["default"].findByIdAndDelete({
              _id: _mongoose["default"].Types.ObjectId(id)
            }, function (error) {
              if (error) return error;
            });

            if (Object.keys(person.superior).length > 0) {
              _fidelizado = person.fidelizado ? -1 : 0;
              queryCampo = {};
              tipo = person.tipo === 'lider' ? 'lideres' : person.tipo === 'macro' ? 'macros' : person.tipo === 'multiplicador' ? 'multip' : 'votantes';
              queryCampo[tipo] = {
                'id': id
              };

              _Persona["default"].findByIdAndUpdate({
                '_id': _mongoose["default"].Types.ObjectId(person.superior.id)
              }, {
                $inc: {
                  'totalFidelizados': _fidelizado,
                  'totalPersonas': -1
                },
                $pull: queryCampo
              }, function (error) {
                if (error) return error;
              });
            }

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function mainFindSuperior(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

var eliminarPersona = function eliminarPersona(root, _ref10) {
  var id = _ref10.id;
  mainFindSuperior(id);
};

exports.eliminarPersona = eliminarPersona;

var actualizarPersona = function actualizarPersona(root, _ref11) {
  var input = _ref11.input;
  return new Promise(function (resolve, rejects) {
    _Persona["default"].findByIdAndUpdate({
      _id: input.id
    }, {
      cedula: input.cedula,
      nombre: input.nombre,
      apellido: input.apellido,
      fechaCumple: input.fechaCumple,
      estadoCivil: input.estadoCivil,
      ocupacion: input.ocupacion,
      perfil: input.perfil,
      celular: input.celular,
      direccion: input.direccion,
      correo: input.correo,
      edad: calcularEdad(input.fechaCumple),
      zona: input.zona,
      barrio: input.barrio ? input.barrio : null,
      lugarVotacion: input.lugarVotacion,
      mesaVotacion: input.mesaVotacion,
      metaVotos: input.metaVotos,
      estadoContacto: input.estadoContacto,
      genero: input.genero,
      dinero: input.dinero,
      fidelizado: input.fidelizado
    }, {
      "new": true
    }, function (error, persona) {
      if (error) rejects(error);else resolve(persona);
    });
  });
};

exports.actualizarPersona = actualizarPersona;
//# sourceMappingURL=Persona.js.map
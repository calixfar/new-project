"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _resolvers = require("./data.js/resolvers");

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _graphqlImport = require("graphql-import");

//import {typeDefs} from './data.js/schema'
_dotenv["default"].config({
  path: 'variables.env'
});

var typeDefs = (0, _graphqlImport.importSchema)('src/data.js/schema.graphql');
var app = (0, _express["default"])();
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: typeDefs,
  resolvers: _resolvers.resolvers,
  context: function () {
    var _context = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var req, token, usuarioActual;
      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = _ref.req;
              //obtener token
              token = req.headers['authorization'];

              if (!(token !== 'null')) {
                _context2.next = 14;
                break;
              }

              _context2.prev = 3;
              _context2.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.SECRETO);

            case 6:
              usuarioActual = _context2.sent;
              req.usuarioActual = usuarioActual;
              return _context2.abrupt("return", {
                usuarioActual: usuarioActual
              });

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](3);
              console.log(_context2.t0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }()
});
server.applyMiddleware({
  app: app
});
app.listen({
  port: 4000
}, function () {
  return console.log("Servidor corriendo en http://localhost:4000".concat(server.graphqlPath));
});
//# sourceMappingURL=index.js.map
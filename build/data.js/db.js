"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conectar = conectar;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config({
  path: 'variables.env'
});

_mongoose["default"].Promise = global.Promise; //mongodb://localhost:27017/electoral

function conectar() {
  //mongoose.connect('mongodb+srv://user-1:MO.ngodb161@cluster0-dgiyl.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  _mongoose["default"].connect(process.env.DB_URL, {
    useNewUrlParser: true
  });

  _mongoose["default"].set('setFindAndModify', false);
}
//# sourceMappingURL=db.js.map
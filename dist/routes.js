"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _PagesController = require('./app/controllers/PagesController'); var _PagesController2 = _interopRequireDefault(_PagesController);
var _constants = require('./config/constants');

const routes = _express.Router.call(void 0, )

routes.get(`/${_constants.API_VERSION}/pages`, _PagesController2.default.index)
routes.post(`/${_constants.API_VERSION}/pages`, _PagesController2.default.create)

exports. default = routes

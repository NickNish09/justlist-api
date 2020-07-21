"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Page = require('../models/Page'); var _Page2 = _interopRequireDefault(_Page);

class PagesController {
   async index (req, res) {
    try {
      const pages = await _Page2.default.find()
      return res.status(200).send({ paginas: pages })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at listing page' })
    }
  }

   async create (req, res) {
    try {
      const page = await _Page2.default.create(req.body)

      console.log(page.uppercaseContent())
      return res.status(200).send({ page })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating page' })
    }
  }
}

exports. default = new PagesController()

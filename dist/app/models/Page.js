"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');








const PageSchema = new (0, _mongoose.Schema)({
  url: {
    type: String,
    required: true,
    unique: true
  },
  pages: [
    {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Page'
    }
  ],
  todos: [
    {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ],
  content: {
    type: String
  }
}, { timestamps: true })

PageSchema.methods.uppercaseContent = function () {
  return this.url.toUpperCase()
}

exports. default = _mongoose.model('Page', PageSchema)

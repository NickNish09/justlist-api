"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const TodoSchema = new (0, _mongoose.Schema)({
  content: {
    type: String,
    required: true
  },
  isFinished: {
    type: Boolean
  },
  position: {
    type: Number,
    required: true
  }
}, { timestamps: true })

exports. default = _mongoose.model.call(void 0, 'Todo', TodoSchema)

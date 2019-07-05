const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoItems = new Schema({

    text: {
        type: String,
        required: true
    },

    is_deleted: {
        type: Boolean,
        required: true
    },

    is_done: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('todoitems', TodoItems)
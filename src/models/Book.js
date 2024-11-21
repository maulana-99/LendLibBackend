const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pageNumber:{
        type: Number,
        required: true,
    },
    langguage: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema);

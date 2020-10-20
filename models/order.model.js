const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDish = new Schema({
    dish : {
        type: mongoose.Schema.ObjectId,
        ref: 'Dish',
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    comments: String,
});

const orderSchema = new Schema({
    table: {
        type: mongoose.Schema.ObjectId,
        ref: 'Table',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    clientName: {
        type: String,
        required: true
    },
    dishes: [orderDish],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

let OrderModel = mongoose.model('Order', orderSchema, 'order');

module.exports = {
    OrderModel
};

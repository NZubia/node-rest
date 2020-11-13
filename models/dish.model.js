const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    dishName: {
        type: String,
        required: true
    },
    dishDescription: {
        type: String,
        required: true
    },
    dishImgSrc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
        values: ["DRINKS", "PASTA", "SOUPS", "SALADS"], // TODO: Enum
    },
});

let DishModel = mongoose.model('Dish', dishSchema, 'dish');

module.exports = {
    DishModel
};

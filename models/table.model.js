const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    tableName: {
        type: String,
        required: true
    },
    status : {
        type: String,
        values: ["EMPTY", "RESERVED", "BUSY", "ORDER", "SERVED"], // TODO: Enum
        default: "EMPTY"
    }
});

let TableModel = mongoose.model('Table', tableSchema, 'table');

module.exports = {
    TableModel
};

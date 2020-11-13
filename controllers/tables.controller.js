const {
    TableModel
} = require('../models/table.model');

/**
 * Funcion que crea un producto nuevo.
 * @param {*} req - Request Object
 * @param {*} res - request Object
 */
async function newTable(req, res){
    const body = req.body;
    if(body.name){
        try{
            const newTable = await new TableModel({
                tableName: body.name
            }).save();

            if(newTable) {
                res.json({'data': newTable});
            } else {
                res.status(500).send("ERROR");
            }
        } catch(err){
            console.log(err)
            res.status(500).send("ERROR");
        }
    }else {
        res.status(402).send("BAD PARAMETERS");
    }
};

async function list(req, res){
    const tablesList = await TableModel.find({});

    res.json({'data': tablesList});

}

module.exports = {
    newTable,
    list
};

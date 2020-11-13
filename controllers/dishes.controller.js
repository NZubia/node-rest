const {
    DishModel
} = require('../models/dish.model');

/**
 * Funcion que crea un producto nuevo.
 * @param {*} req - Request Object
 * @param {*} res - request Object
 */
async function newDish(req, res){
    const body = req.body;
    if(body.name && body.desc && body.img && body.price && body.cat){
        try{
            const newDish = await new DishModel({
                dishName: body.name,
                dishDescription: body.desc,
                dishImgSrc: body.img,
                price: body.price,
                category: body.cat
            }).save();

            if(newDish) {
                res.json({'data': newDish});
            } else {
                res.status(500).send("ERROR");
            }
        } catch(err){
            console.log(err)
            res.status(500).send("ERROR");
        }
    }else {
        res.status(402).json({
            "message": "BAD PARAMETERS",
            "ERROR": {
                "name": !!body.name,
                "desc": !!body.desc,
                "img": !!body.img,
                "price": !!body.price,
                "cat": !!body.cat,
            }
        });
    }
};

async function list(req, res){
    const category = req.query.category ? req.query.category : "";
    const dishQuery = {};

    if (category){
        dishQuery['category'] = category;
    }

    const dishesList = await DishModel.find(dishQuery);

    res.json({'data': dishesList});

}

module.exports = {
    newDish,
    list
};

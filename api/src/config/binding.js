import Mongoose from 'mongoose';
import { router } from 'src/config/router';
let models = null;

const findInDatabase = async (model, id ) => {
    return Mongoose.model(model).findOne({
        _id: id
    })
};

const modelBinding = () => {
    models = Mongoose.modelNames();

    models.forEach(param => {
        let Schema = param,
            modelName = param.toLowerCase();

        router.param(modelName, (req, res, next, id ) => {
            return findInDatabase(Schema, id).then(model => {
                req[modelName] = model;
                next();
            }).catch(err => {
                next(err);
            });
        })
    });
};


export { modelBinding };

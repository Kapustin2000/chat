import Mongoose from 'mongoose';

const DB_URL = process.env['DB_URL'];

const mongooseOptions = {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
};

const connect = async () => {
    return await Mongoose.connect(
        DB_URL,
        mongooseOptions
    ).then(() => {
        console.log("connected");
    });
};

export { connect };

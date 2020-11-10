import Mongoose from 'mongoose';

const DB_URL = process.env['DB_URL'];

const mongooseOptions = {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
};

const connect = async function connect() {
    try {
        await Mongoose.connect(
            DB_URL,
            mongooseOptions
        ).then(() => {
            console.log("connected");
        });
    } catch (err) {
        console.log(err);

        throw err;
    }
};

export { connect };

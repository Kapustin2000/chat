import DotEnv from 'dotenv'; DotEnv.config();
import { connect } from 'src/config/db';

const up = async function () {
    await connect();
    // await start();
}

up();

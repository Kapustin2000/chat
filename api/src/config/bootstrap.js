import DotEnv from 'dotenv'; DotEnv.config();
import { connect } from 'src/config/db';
import { configCron } from 'src/config/cron/index';

const up = async function () {
    await connect();

    await configCron();
};

up();

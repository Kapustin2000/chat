import './src/config/bootstrap.js';

import DotEnv from 'dotenv'; DotEnv.config();
import Express from 'express';
import { router } from './src/config/router.js'

const app = new Express();

const HTTP_PORT = process.env['HTTP_PORT'];


app.listen(HTTP_PORT, () => {
    console.log(`running on port ${HTTP_PORT}`);
});

app.use(router);

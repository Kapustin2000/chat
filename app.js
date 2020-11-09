import 'src/config/bootstrap';

import DotEnv from 'dotenv'; DotEnv.config();
import Express from 'express';
import { router } from 'src/config/router'

const app = new Express();

const HTTP_PORT = process.env['HTTP_PORT'];


app.listen(HTTP_PORT, () => {
    console.log(`running on port ${HTTP_PORT}`);
});

app.use(router);

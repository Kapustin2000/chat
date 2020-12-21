import 'src/config/bootstrap';

import Express from 'express';
import BodyParser from  'body-parser';
import cors from 'cors';
import { router } from 'src/config/router'
import { Socket } from 'src/config/socket';

const app = new Express();
const HTTP_PORT = process.env['HTTP_PORT'];

app.use(cors());
const server = app.listen(HTTP_PORT, () => {
    console.log(`running on port ${HTTP_PORT}`);
});

global.io = new Socket(server);

app.use(BodyParser.json());

app.use('api/', router);

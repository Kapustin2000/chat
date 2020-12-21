import 'src/config/bootstrap';

import Express from 'express';
import BodyParser from  'body-parser';
import { router } from 'src/config/router'
import { modelBinding } from 'src/config/binding'
import cors from 'cors';
import { Socket } from 'src/config/socket';

const app = new Express();
const HTTP_PORT = process.env['HTTP_PORT'];

app.use(cors());
const server = app.listen(HTTP_PORT, () => {
    console.log(`running on port ${HTTP_PORT}`);
});

global.io = new Socket(server);

app.use(BodyParser.json());
modelBinding();

app.use(router);

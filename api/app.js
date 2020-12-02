import 'src/config/bootstrap';

import Express from 'express';
import BodyParser from  'body-parser';
import { router } from 'src/config/router'
import cors from 'cors';


const app = new Express();
const HTTP_PORT = process.env['HTTP_PORT'];

app.use(cors());
app.listen(HTTP_PORT, () => {
    console.log(`running on port ${HTTP_PORT}`);
});

app.use(BodyParser.json());
app.use(router);

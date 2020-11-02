'use strict';

import Express from 'express';

const port = 8080;
const host = 'localhost';

const app = new Express();

app.listen(port, () => {
    console.log(`running on port ${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello World');
});
const express = require('express');
const app = express();


//create route handler

app.get('/', (req, res) => {
    res.send({ bye: 'Conor'});
});

//Use port assigned by Heroku, otherwise use port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);

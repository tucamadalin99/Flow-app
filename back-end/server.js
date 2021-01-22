const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const PORT = 8081;

app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log(`RESTFul services running on ${PORT}`)
})
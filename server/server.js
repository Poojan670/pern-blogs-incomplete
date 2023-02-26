require('dotenv').config()
const express = require('express')

app = express();

require('./main/admin')(app);
require('./main/api/routes')(app);
require('./main/Joi/index')();

const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log(`Listening on port ${port}, 
    Please check: http://localhost:${port}`)
})
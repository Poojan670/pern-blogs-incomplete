require("dotenv").config();
const express = require("express");

app = express();

process.env.TZ = "Asia/Kathmandu";

require("./main/admin")(app);
require("./main/api/routes")(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}, 
    Please check: http://localhost:${port}`);
});

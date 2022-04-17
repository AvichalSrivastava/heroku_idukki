const http = require('http');

const port = process.env.PORT || 8080;
const express = require('express');

var bodyParser = require('body-parser');

const cors=require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.json({ 'headers' : req.headers,message: "Welcome to application." });
});


require('./App/Route/Main.Route')(app);

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});

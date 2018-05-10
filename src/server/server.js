const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('env', (process.env.NODE_ENV || "local"));


  app.use(bodyParser.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

  app.get('/api', (req, res) =>{
    console.log(req);
   res.send({name:"ali"});
  });

app.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
});

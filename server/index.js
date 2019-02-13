const express = require('express');
const bodyParser = require('body-parser');
const {uD, uP, uR} = require('../db/index.js');
const app = express();
const port = 3000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );


app.post('/products', ({body}, res) => {
  const cb = (err, results) => {
    if (err) {
      console.log('Error in products get request!');
      res.status(404).send();
    } else {
      console.log('Successful get in products!');
      res.status(200).send(results);
    }
  }
  uP(cb, body);
});

app.post('/reviews', ({body}, res) => {
  const cb = (err, results) => {
    if (err) {
      console.log('Error in reviews get request!');
      res.status(404).send();
    } else {
      console.log('Successful get in reviews!');
      res.status(200).send(results);
    }
  }
  uR(cb, body);
});

app.post('/descriptions', ({body}, res) => {
  const cb = (err, results) => {
    if (err) {
      console.log('Error in desc get request!');
      res.status(404).send();
    } else {
      console.log('Successful get in descriptions!');
      res.status(200).send(results);
    }
  }
  uD(cb, body);
});

app.use(express.static(__dirname + '/../public'));

app.listen(port, () => console.log('Now listening on port: ' + port));
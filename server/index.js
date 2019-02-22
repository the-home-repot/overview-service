const express = require('express');
const bodyParser = require('body-parser');
const {queryDB} = require('../db/index.js');
const app = express();
const port = 3030;

console.log('I\'m running here PM2');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.get('/product_info/:ID', (req, res) => {
  let id = req.params.ID;
  const cb = (err, results) => {
    if (err) {
      console.log('Error in get request!');
      res.status(404).send();
    } else {
      console.log('Successful get request!');
      res.status(200).send(results);
    }
  }
  queryDB(cb, id);
});

app.get('/test', (req, res) => {
  res.send('Success');
})

app.use(express.static(__dirname + '/../public'));

app.listen(port, () => console.log('Now listening on port: ' + port));
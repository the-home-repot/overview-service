const express = require('express');
const bodyParser = require('body-parser');
const {con} = require('../db/index.js');
const app = express();
const port = 3000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.get('/products', (req, res) => {
  con.query("SELECT * FROM products", (err, res) => {
    if (err) { 
      console.log('Error querying products') 
    } else {
      console.log("Successful GET from Products!");
      console.log(res)
    }
  })
  res.send('Success');
});

app.get('/reviews', (req, res) => {
  con.query("SELECT * FROM reviews", (err, res) => {
    if (err) { 
      console.log('Error querying reviews') 
    } else {
      console.log("Successful GET from Reviews!");
      console.log(res);
    }
  })
  res.send('Success');
});

app.get('/descriptions', (req, res) => {
  con.query("SELECT * FROM descriptions", (err, res) => {
    if (err) { 
      console.log('Error querying descriptions') 
    } else {
      console.log("Successful GET from Descriptions!");
      console.log(res);
    }
  })
  res.send('success')
});

app.use(express.static(__dirname + '/../public'));

app.listen(port, () => console.log('Now listening on port: ' + port));
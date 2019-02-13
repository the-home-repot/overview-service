const mysql = require('mysql');
const mysqlConfig = require('./config')
const {data} = require('./mock_data.js');

const con = mysql.createConnection(mysqlConfig);

con.connect(function(err) {
  if (err) {
    console.log('There was an error connecting to DB');
  } else {
    console.log("Connected to DB!");
  }
});

const updateDescriptions = (cb, {id}) => {
  let queryStr = "SELECT description FROM descriptions WHERE product_id =" + id + ';';
  con.query(queryStr, (err, res) => {
    if (err) { 
      console.log('Error querying descriptions') 
      cb(err);
    } else {
      console.log("Successful GET from Descriptions!");
      cb(null, res);
    }
  })
}

const updateProducts = (cb, {id}) => {
  let queryStr = "SELECT title, price FROM products WHERE id =" + id + ';';
  con.query(queryStr, (err, res) => {
    if (err) { 
      console.log('Error querying descriptions') 
      cb(err);
    } else {
      console.log("Successful GET from Descriptions!");
      cb(null, res);
    }
  })
} 

const updateReviews = (cb, {id}) => {
let queryStr = "SELECT rating FROM reviews WHERE product_id =" + id + ';';
con.query(queryStr, (err, res) => {
  if (err) { 
    console.log('Error querying reviews') 
    cb(err);
  } else {
    console.log("Successful GET from reviews!");
    cb(null, res);
  }
})
}

module.exports.con = con;
module.exports.uD = updateDescriptions;
module.exports.uP = updateProducts;
module.exports.uR = updateReviews;
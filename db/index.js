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

module.exports.con = con;
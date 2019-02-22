const mysql = require('mysql');
const mysqlConfig = require('./config')
const con = mysql.createConnection(mysqlConfig);
con.connect((err) => err ? console.log('Err connected to DB') : console.log('Connected to DB!'));

const queryDB  = (cb, id) =>  {    
  let queryDescsStr = 'SELECT description FROM descriptions WHERE product_id =' + id + ';';
  let queryProductsStr = 'SELECT title, price FROM products WHERE id =' + id + ';';
  let queryReviewsStr = 'SELECT rating FROM reviews WHERE product_id =' + id + ';';
  con.query(queryDescsStr, (err, descs) => {
    err ?  cb(err) : console.log('Successful DB query for descriptions');
    con.query(queryProductsStr, (err, prods) => {
      err ? console.log('Error querying products') : console.log('Successful DB query for products');
      con.query(queryReviewsStr, (err, revs) => {
        err ? console.log('Error querying reviews') : console.log('Successful DB query for reviews');
        con.end((err) => {
          err ? console.log('Error closing DB connection') :
          queryResults = {
            descs: descs,
            prods: prods,
            revs: revs
          }
          cb(null, queryResults);     
        })
      })
    })
  }) 
}
module.exports.queryDB = queryDB;
module.exports.con = con;
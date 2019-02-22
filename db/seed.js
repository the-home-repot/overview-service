const {con} = require('./index.js')
const {data} = require('./mock_data.js');

const descInsert = () => {
  let productId = 1;
  while (productId <= 100) {
    let descriptions = data.descriptions.slice();
    let numOfDesc = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numOfDesc; i++) {
      desc = descriptions.splice(Math.floor(Math.random() * numOfDesc), 1)[0];
      let queryStr = 'INSERT INTO descriptions (description, product_id) VALUES ("' + desc + '",' + productId + ');'
      con.query(queryStr, (err, res) => {
        if (err) { 
          console.log('Error querying DB descriptions', err) 
        } else {
          console.log("Successfully seeded!");
        }
      })
    }
    productId++;
  }
}

const productInsert = () => {
  let products = data.fullProducts.slice();
  let index = 0;
  while (index < 100) {
    let price = (Math.floor(Math.random() * 20) + 1) * 50;
    let product = products[index];
    let queryStr = 'INSERT INTO products (title, price) VALUES ("' + product + '",' + price + ');'
    // con.query(queryStr, (err, res) => {
    //   if (err) { 
    //     console.log('Error querying DB products') 
    //   } else {
    //     console.log("Successfully seeded!");
    //   }
    // })
    index++;
  }

}

const reviewInsert = () => {
  let index = 0;
  while (index < 1000) {
    let rating = Math.floor(Math.random() * 5) + 1;
    let productId = Math.floor(Math.random() * 100) + 1;
    let queryStr = "INSERT INTO reviews (rating, product_id) VALUES (" + rating + ',' + productId + ");"
    // con.query(queryStr, (err, res) => {
    //   if (err) { 
    //     console.log('Error querying DB reviews') 
    //   } else {
    //     console.log("Successfully seeded!");
    //   }
    // })
    index++;
  }
}

const seeder = () => {
  descInsert();
  productInsert();
  reviewInsert();
}

module.exports.seeder = seeder;
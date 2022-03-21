const {MongoClient} = require('mongodb');
require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB_NAME = 'clearfashion';
const products = require('./all_products.json')
let db;
let collection=null;

const connect = async()=>{
  try{
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
     db=client.db(MONGODB_DB_NAME)
    console.log('Connected successfully to server');
  }
  catch(error){console.error(error)}
}



const clearCollection = async()=> {
  try{
    await connect()
    collection = db.collection('products')
    const result = collection.deleteMany({});
    console.log(`collection products from ${MONGODB_DB_NAME} is cleared`)
    console.log(result)
  }
  catch(error){console.log(error)}
}


const insertData= async()=>{
  try{
    await connect();
    collection = db.collection('products')
    const result = collection.insertMany(products)
    console.log(`data were added to collection products of database ${MONGODB_DB_NAME}`)
    console.log(result)
  }
  catch(error){console.log(error)}
}





//FIND ALL PRODUCT RELATED TO A GIVEN brand
const sortByBrand = async(brand)=>{
  await connect();

  collection = db.collection('products')
  const results = await collection.find({brand:brand}).toArray();
  console.log(results);
}

//FIND ALL PRODUCTS LESS THAN A PRICE
const lessThanPrice = async(price)=>{
  await connect();

  collection = db.collection('products')
  const products = await collection.find({'price':{$lt:price}}).toArray();
  console.log(products);
}

//FIND ALL PRODUCTS SORTED BY PRICE
const sortedByPrice = async()=>{
  await connect();

  collection = db.collection('products')
  let products = await collection.find().toArray();
  products=products.sort(function(a,b){return a.price-b.price})
  console.log(products);
}


//FIND ALL PRODUCTS SORTED BY DATE
async function sortedByDate(){
  await connect();

  collection = db.collection('products')
  let products = await collection.find().toArray();
  products=products.sort(function(a,b){return Date(a.released)-Date(b.released)})
  console.log(products);
}


//FIND ALL PRODUCTS SCRAPED LESS THAN 2 WEEKS
async function scrapedLessThan2Weeks(){
  await connect();

  collection = db.collection('products')
  let products = await collection.find().toArray();
  products =products.filter(function(item,idx){return new Date(today).getTime()-new Date(item.released).getTime()<=12096e5});
  console.log(products);
}


connect();
// clearCollection();
// insertData();
//sortByBrand('DEDICATED.')
// lessThanPrice(50);
// sortedByPrice();
//sortedByDate();
// scrapedLessThan2Weeks()

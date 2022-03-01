const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://clearfashion:clearfashion3210@clearfashion.6ubr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
const client = new MongoClient(MONGODB_URI, {'useNewUrlParser': true});
const products = require('./all_products.json')



async function main() {

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(MONGODB_DB_NAME);
  return 'done.';
}

async function clearCollection(){
  try{
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);
    const collection = db.collection('products')
    const result = await collection.deleteMany({});
    console.log(`collection products from ${MONGODB_DB_NAME} is cleared`)
    console.log(result)
  }
  catch(error){console.log(error)}
  finally{
    await client.close()
  }
}


async function insertData(){
  try{
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);
    const collection = db.collection('products')
    const result = await collection.insertMany(products)
    console.log(`data were added to collection products of database ${MONGODB_DB_NAME}`)
    console.log(result)
  }
  catch(error){console.log(error)}
  finally{
    await client.close()
  }
}

//clearCollection()
insertData();

// main()
//   .then(console.log)
//   .catch(console.error)
//   .then(insertData())
//   .finally(() => client.close());

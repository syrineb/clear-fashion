const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://clearfashion:clearfashion3210@clearfashion.6ubr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
const client = new MongoClient(MONGODB_URI);




async function main() {
  
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(MONGODB_DB_NAME);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

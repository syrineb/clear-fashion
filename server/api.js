const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const url = require('url');
const querystring = require('querystring');

const PORT = 8092;

const app = express();
//connection to MONGODB
const {MongoClient} = require('mongodb');
require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB_NAME = 'clearfashion';
let db;
let collection;
let results;
app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());
module.exports = app;

async function connect(){
  try{
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
     db=client.db(MONGODB_DB_NAME)
     console.log('Connected successfully to server');
     collection = db.collection('products')
     results = await collection.find().toArray();
  }

  catch(error){console.log(error)}

}

connect()



// ENDPOINT GET /
app.get('/', async (request, response) => {
  response.send({'ack': true});
});


app.get('/products/search', async (request, response)=>{
  const rawUrl=request.url;
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  const obj = JSON.parse(JSON.stringify(parsedQs));
  let mySearch=results;
  let limit=0;
  for (const key in obj) {
      if(key=='brand'){mySearch=mySearch.filter(x=>x.brand==obj[key])}
      else if (key=='price') {mySearch=mySearch.filter(x=>x.brand<=obj[key])}
      else if (key=='limit'){limit=obj[key]}
    }
  if(limit!=0){mySearch=mySearch.slice(0,limit)}
  response.send(mySearch);
});
//ENDPOINT 'GET /products/:id'
app.get('/products/:id',async (request,response)=>{
   const res = results.find(x=>x._id==request.params.id)
   response.send(res)
});





app.get('/products',async (request,response)=>{
   response.send(results)
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});
//API endpoint 'GET /products/:id'
app.get('GET/products/:id',async (request,response)=>{
  var collection= await collection();
  console.log(collection)
  collection.findOne({"id":new ObjectId(request.params.id)}, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send('hello');
 })
})
app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

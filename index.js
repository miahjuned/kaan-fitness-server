const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());


// console.log(process.env.DB_USER)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7tcxm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  // console.log('connecting error', err)

  const AdminCollection = client.db("kaanFitness").collection("admin");
  const ReviewCollection = client.db("kaanFitness").collection("review");
  const OrderCollection = client.db("kaanFitness").collection("order");
  const loginUserCollection = client.db("kaanFitness").collection("loginUser");
  const ServicesCollection = client.db("kaanFitness").collection("services");

  app.get('/allServices', (req, res) => {
    ServicesCollection.find()
    .toArray((err, items) => {
      res.send(items)
      // console.log('from database', items)
    })
  })


  app.post('/addServices', (req, res) => {
    const newProduct = req.body;
    // console.log('adding new product: ', newProduct)
    ServicesCollection.insertOne(newProduct)
    .then(result => {
      // console.log('inseart count',result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/checkout/:id', (req, res) => {

    ServicesCollection.find({_id: ObjectId(req.params.id)})
    .toArray( (err, documents) => {
      res.send(documents[0]);
      console.log(err);
      alert(err);
    })
  })


  app.post('/addAdmin', (req, res) => {
    const newProduct = req.body;
    // console.log('adding new product: ', newProduct)
    AdminCollection.insertOne(newProduct)
    .then(result => {
      // console.log('inseart count',result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })


  app.post('/order', (req, res) => {
    const newProduct = req.body;
    // console.log('adding new product: ', newProduct)
    OrderCollection.insertOne(newProduct)
    .then(result => {
      // console.log('inseart count',result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })


  app.post('/loginUser', (req, res) => {
    const email = req.body.email;
    // console.log('adding new product: ', newProduct)
    AdminCollection.find({ email: email })
    .then(result => {
      // console.log('inseart count',result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })


  app.post('/addReview', (req, res) => {
    const newReview = req.body;
    // console.log('adding new product: ', newProduct)
    ReviewCollection.insertOne(newReview)
    .then(result => {
      // console.log('inseart count',result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/allReview', (req, res) => {
    ReviewCollection.find()
    .toArray((err, items) => {
      res.send(items)
      // console.log('from database', items)
    })
  })

  app.get('/allOrder', (req, res) => {
    OrderCollection.find()
    .toArray((err, items) => {
      res.send(items)
      // console.log('from database', items)
    })
  })

  // client.close();
});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)
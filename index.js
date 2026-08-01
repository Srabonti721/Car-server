require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efzq5bn.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 client.connect().catch(console.dir);
 const carCollection = client.db("carDb").collection("cars");

app.get("/cars", async(req, res)=>{
  const result = await carCollection.find().toArray();
  res.send(result)
})

 app.post("/cars", async(req, res)=>{
  const addCar = req.body;
  const result = await carCollection.insertOne(addCar);
  res.send(result)
 })


 
   // Send a ping to confirm a successful connection
     client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

// Dream-car 2zJuEA9CWgv6IcvM
app.get("/", (req, res)=>{
    res.send("my dream car collection")
})

app.listen(port,()=>{
    console.log(`car server is running on port : ${port}`)
    })

module.exports = app
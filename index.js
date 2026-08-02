require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efzq5bn.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
client.connect().catch(console.dir);
const carCollection = client.db("carDb").collection("cars");

app.get("/cars", async (req, res) => {
    const result = await carCollection.find().toArray();
    res.send(result);
});

app.get("/cars/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await carCollection.findOne(query);
    res.send(result);
});

app.post("/cars", async (req, res) => {
    const addCar = req.body;
    const result = await carCollection.insertOne(addCar);
    res.send(result);
});
app.put("/cars/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedCar = req.body;
    const updatedDoc = {
        $set: updatedCar,
    };
    const result = await carCollection.updateOne(filter, updatedDoc, options);
    res.send(result);
});

app.delete("/cars/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await carCollection.deleteOne(query);
    res.send(result);
    console.log(result);
});

// Dream-car 2zJuEA9CWgv6IcvM
app.get("/", (req, res) => {
    res.send("my dream car collection");
});

app.listen(port, () => {
    console.log(`car server is running on port : ${port}`);
});

module.exports = app;

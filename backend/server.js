const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // runs on port 5000

app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://lovelyemeraldsjain:Wildcats1234!@wildcats.j4udc.mongodb.net/?retryWrites=true&w=majority&appName=wildcats";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("wildcats");
    const todosCollection = db.collection("todos");

    // Add a new to-do
    app.post('/todos', async (req, res) => {
        const newTodo = { task: req.body.task, completed: false };
        const result = await todosCollection.insertOne(newTodo);
        res.json(result.ops[0]);
      });

    // Delete a to-do
    app.delete('/todos/:id', async (req, res) => {
        const id = req.params.id;
        const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
        res.json(result);
      });
    
    // Start the server
    app.listen(port, () => {
        console.log('Server is running on http://localhost:${port}');
      });

  } catch (err) {
    // Ensures that the client will close when you finish/error
    console.error(err)
  }
}
connectToDb();

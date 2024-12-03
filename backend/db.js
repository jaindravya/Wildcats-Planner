const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://lovelyemeraldsjain:Wildcats1234!@wildcats.j4udc.mongodb.net/?retryWrites=true&w=majority&appName=wildcats";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('wildcats');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

module.exports = connectToDB;
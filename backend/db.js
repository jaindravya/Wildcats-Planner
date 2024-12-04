const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://lovelyemeraldsjain:Wildcats1234!@wildcats.j4udc.mongodb.net/?retryWrites=true&w=majority&appName=wildcats";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

module.exports = connectToDB;
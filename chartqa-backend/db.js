//old one
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('✅ Connected to MongoDB Atlas');
    console.log("Using DB:", db.databaseName);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

module.exports = {
    connectToDatabase,
    getDB,
  };


// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');

// dotenv.config();

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   tls: true,
//   tlsAllowInvalidCertificates: true, // ⚠️ Dev-only!
// });

// let db;

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     db = client.db(process.env.DB_NAME);
//     console.log('✅ Connected to MongoDB Atlas');
//     console.log('Using DB:', db.databaseName);
//   } catch (error) {
//     console.error('❌ MongoDB connection failed:', error);
//   }
// }

// function getDB() {
//   if (!db) {
//     throw new Error('Database not connected. Call connectToDatabase() first.');
//   }
//   return db;
// }

// module.exports = {
//   connectToDatabase,
//   getDB,
// };

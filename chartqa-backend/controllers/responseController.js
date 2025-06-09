// controllers/responseController.js
const { getDB } = require('../db');

async function saveResponse(req, res) {
  try {
    const db = getDB();
    const collection = db.collection('responses');

    const responseData = req.body;
    responseData.createdAt = new Date(); // Timestamp

    const result = await collection.insertOne(responseData);
    res.status(201).json({ message: 'Response saved', id: result.insertedId });
  } catch (err) {
    console.error('❌ Error saving response to MongoDB:', {
      message: err.message,
      stack: err.stack,
    });
    res.status(500).json({ error: 'Failed to save response' });
  }
}

module.exports = {
  saveResponse,
};

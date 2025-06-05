// // Add this at the top
// const { getDB } = require('../db');
// const { Parser } = require('json2csv');

// async function downloadResponsesAsCSV(req, res) {
//   try {
//     const db = getDB();
//     const collection = db.collection('responses');

//     const responses = await collection.find().toArray();

//     const flatResponses = responses.map((doc) => {
//       return doc.chartResponses.map((r) => ({
//         userId: doc.userId,
//         createdAt: doc.createdAt,
//         chartId: r.chartId,
//         questionType: r.questionType,
//         explanationType: r.explanationType,
//         selectedAnswer: r.selectedAnswer,
//         correctAnswer: r.correctAnswer,
//         isCorrect: r.isCorrect,
//         timeTakenSeconds: r.timeTakenSeconds,
//       }));
//     }).flat();

//     const parser = new Parser();
//     const csv = parser.parse(flatResponses);

//     res.header('Content-Type', 'text/csv');
//     res.attachment('chartqa_responses.csv');
//     res.send(csv);
//   } catch (err) {
//     console.error('CSV download error:', err);
//     res.status(500).json({ error: 'Failed to download CSV' });
//   }
// }

// module.exports = {
//   saveResponse,
//   downloadResponsesAsCSV
// };



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

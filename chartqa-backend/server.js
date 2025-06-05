// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const responseRoutes = require('./routes/responseRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/responses', responseRoutes);

// Connect to DB, then start server
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB. Server not started.', err);
});






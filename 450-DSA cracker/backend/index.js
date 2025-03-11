const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const UserProgressRouter = require('./Routes/userProgress'); // Import the new route

require('dotenv').config();
require('./Models/db'); // Ensure MongoDB connection is initialized

const PORT = process.env.PORT || 8080; 

app.use(bodyParser.json());
app.use(cors());

// Authentication Routes
app.use('/auth', AuthRouter);

// User Progress Routes
app.use('/progress', UserProgressRouter); // Add this line

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

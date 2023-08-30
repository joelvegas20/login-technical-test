// Third Party Imports.
const express = require('express');
const cors = require('cors');

// Local Imports.
const router = require('./routes/index.routes');
const { connectToMongoDB } = require('./database');

// Initialize express.
const app = express();

// Middlewares.
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Serve Static Files.
app.use('/profileTemps', express.static('src/profileTemps'));

// Serve Routes.
app.use('/user', router);

// Set port.
const PORT = process.env.PORT || 8080;

// Run server.
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    // Run database.
    await connectToMongoDB();
}
);


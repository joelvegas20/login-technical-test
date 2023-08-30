// Third Party Imports.
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

// Environment Variables.
const {
    DATABASE_URL
} = process.env;


// Connect to MongoDB.
const connectToMongoDB = async () => {
    try {
        // Connect to MongoDB.
        await mongoose.connect(DATABASE_URL);
        // Get database.
        const db = await mongoose.connection;
        // Handle errors and success.
        db.on('error', (error) => console.log(error));
        db.once('connected', () =>
            console.log('Connected to MongoDB.')
        );
        // Return database.
        return db;

    } catch (error) {
        process.exit(1);
    }
}

// Export.
module.exports = {
    connectToMongoDB
};
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoDbUrl = process.env.mongoDbUrl;

async function initializeDatabase() {
    await mongoose.connect(mongoDbUrl)
        .then(() => { console.log("Connected to database") })
        .catch((err) => { console.log("Error connecting", err) });
}

module.exports = { initializeDatabase };
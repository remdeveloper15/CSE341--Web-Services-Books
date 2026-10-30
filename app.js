// Imports
import express from 'express';

// Create the instance of the app
const app = express ();

// Middleware 

// Middleware to state all request come in JSON format
app.use(express.json());

// Route
app.get('/', (req, res) => {
    // Returns a code 200 (OK) and a JSON
    return res.status(200).json({
        message: "Hello! The express server is working correctly"
    });
});

// Exports
export default app;
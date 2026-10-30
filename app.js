// Imports
import express from 'express';
import { getDb } from './src/db/connect.js';

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

app.get('/trails', async (req, res) => {
    try {
        const trails = await getDb()
        .collection('trails')
        .find({})
        .toArray();

        return res.status(200).json(trails);
    } catch (error) {
        console.error('Failed to retrieve trails:', error.message);
        return res.status(500).json({message: 'Failed to retrieve trails'})
    }
});

// Exports
export default app;
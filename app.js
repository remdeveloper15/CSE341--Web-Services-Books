// Imports
import express from 'express';
import router from './src/router.js';

// Create the instance of the app
const app = express ();

// Middleware 

// Middleware to state all request come in JSON format
app.use(express.json());
app.use(router);

// Route
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

// Exports
export default app;
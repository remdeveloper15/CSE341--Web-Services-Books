//----------IMPORTS----------//
import express from 'express';
import router from './src/router.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

// Create the instance of the app
const app = express ();

//----------MIDDLEWARE----------//
// Middleware to state all request come in JSON format
app.use(express.json());

// Middleware to serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use the router for handling routes
app.use(router);

//----------ROUTES----------//
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

//----------EXPORTS----------//
export default app;
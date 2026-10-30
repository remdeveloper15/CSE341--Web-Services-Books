// Imports
import app from './app.js';

// Read the port from .env
const PORT = process.env.PORT;

// Deploy an error immediately if the port does not exits, to avoid silent errors
if (!PORT) {
    throw new Error("There is any PORT. Ensure that the .env exists and configured")
};

// Start the server
app.listen(PORT, () => {
    console.log(`The Server has been inializated and listening at http://127.0.0.1:${PORT}`);
});


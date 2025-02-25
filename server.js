const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to save registration data
app.post('/save-registration', (req, res) => {
    const visitorData = req.body;

    // Path to the visitor.json file
    const visitorFilePath = path.join(__dirname, 'public', 'visitor.json');

    // Read the existing data in visitor.json
    fs.readFile(visitorFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading visitor.json:', err);
            return res.status(500).json({ message: 'Failed to read data' });
        }

        let visitors = [];
        if (data) {
            visitors = JSON.parse(data);
        }

        // Add the new visitor data
        visitors.push(visitorData);

        // Write the updated data back to visitor.json
        fs.writeFile(visitorFilePath, JSON.stringify(visitors, null, 2), (err) => {
            if (err) {
                console.error('Error writing to visitor.json:', err);
                return res.status(500).json({ message: 'Failed to save data' });
            }

            console.log('Visitor data saved successfully!');
            res.status(200).json({ message: 'Data saved successfully!' });
        });
    });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

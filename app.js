// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express app
const app = express();
const port = 3000; // Or another port if needed

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(cors()); // To allow cross-origin requests (if needed)

// Mock database (you can replace this with actual DB logic)
let users = [];

// POST route to add a new user
app.post('/users', (req, res) => {
    const { name, email, password, role } = req.body;
    
    // Here, you'd typically insert the user data into your database
    const newUser = { UserID: users.length + 1, Name: name, Email: email, Role: role };
    users.push(newUser); // Adding the user to the mock database
    
    res.status(201).json({ message: 'User added successfully!', user: newUser });
});

// GET route to fetch users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Import CORS
const app = express();

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cartinting@2025',
    database: 'CarTintingDB'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the CarTintingDB database');
});

// User Routes
app.get('/users', (req, res) => {
    console.log('GET request to /users received');
    db.query('SELECT * FROM User', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Error fetching users' });
            return;
        }
        console.log('Fetched users:', results); // Log the result for debugging
        res.json(results);  // Sends all users as a JSON response
    });
});

// Client Routes
app.get('/clients', (req, res) => {
    db.query('SELECT * FROM Client', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/clients', (req, res) => {
    const { UserID, Address, Phone, PaymentDetails } = req.body;
    db.query('INSERT INTO Client (UserID, Address, Phone, PaymentDetails) VALUES (?, ?, ?, ?)',
        [UserID, Address, Phone, PaymentDetails],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Client added successfully', clientId: result.insertId });
        }
    );
});

// Other routes remain the same...

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

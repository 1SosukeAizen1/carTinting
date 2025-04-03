const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306, // Ensure this is correct
    user: 'root',
    password: '', // Use the actual password
    database: 'CarTintingDB'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if database connection fails
    }
    console.log('✅ Connected to the CarTintingDB database');
});

// Add User Route (POST /users)
app.post('/users', (req, res) => {
    console.log('📩 Incoming request body:', req.body); // Log request

    const { Name, Email, Password, Role } = req.body;
    

    // Validate request
    if (!Name || !Email || !Password || !Role) {
        console.error('❌ Validation error: Missing fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert the new user into the database
    const query = 'INSERT INTO User (Name, Email, Password, Role) VALUES (?, ?, ?, ?)';
    db.query(query, [Name, Email, Password, Role], (err, result) => {
        if (err) {
            console.error('❌ Database error:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Email already exists' });
            }
            return res.status(500).json({ message: 'Error adding user', error: err.message });
        }
        console.log('✅ User added successfully:', result);
        res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    });
});

// Fetch Users Route (GET /users)
app.get('/users', (req, res) => {
    db.query('SELECT * FROM User', (err, results) => {
        if (err) {
            console.error('❌ Error fetching users:', err);
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.json(results);
    });
});

// Fetch Clients Route (GET /clients)
app.get('/clients', (req, res) => {
    db.query('SELECT * FROM Client', (err, results) => {
        if (err) {
            console.error('❌ Error fetching clients:', err);
            return res.status(500).json({ message: 'Error fetching clients' });
        }
        res.json(results);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

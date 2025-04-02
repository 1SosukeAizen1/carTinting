// 1. Database Setup (MySQL Script)

/*
CREATE DATABASE CarTintingDB;
USE CarTintingDB;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    Email VARCHAR(30) UNIQUE,
    Password VARCHAR(255),
    Role VARCHAR(30)
);

CREATE TABLE Client (
    ClientID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Address VARCHAR(50),
    Phone VARCHAR(11),
    PaymentDetails VARCHAR(30),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Employee (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    AssignedJobs TEXT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Appointment (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    ClientID INT,
    VehicleDetails VARCHAR(50),
    TintType VARCHAR(30),
    Date VARCHAR(8),
    Time VARCHAR(4),
    Status VARCHAR(30),
    FOREIGN KEY (ClientID) REFERENCES Client(ClientID)
);

CREATE TABLE Service (
    ServiceID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    Description TEXT,
    Price DOUBLE
);

CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    ClientID INT,
    ServiceID INT,
    Status VARCHAR(50),
    PaymentStatus VARCHAR(30),
    FOREIGN KEY (ClientID) REFERENCES Client(ClientID),
    FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID)
);

CREATE TABLE Payment (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    Amount DOUBLE,
    Method VARCHAR(30),
    TransactionStatus VARCHAR(30),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Inventory (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    Quantity INT,
    Supplier VARCHAR(30),
    ReorderLevel INT
);

CREATE TABLE Notification (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Message TEXT,
    Timestamp VARCHAR(10),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Support (
    SupportTicket VARCHAR(30) PRIMARY KEY
);
*/

// 2. Backend Setup (Node.js with Express)

const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CarTintingDB'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the CarTintingDB database');
});

// Models and Routes

// User Routes
app.get('/users', (req, res) => {
    db.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const { Name, Email, Password, Role } = req.body;
    db.query('INSERT INTO User (Name, Email, Password, Role) VALUES (?, ?, ?, ?)',
        [Name, Email, Password, Role],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'User added successfully', userId: result.insertId });
        }
    );
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

// Service Routes
app.get('/services', (req, res) => {
    db.query('SELECT * FROM Service', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/services', (req, res) => {
    const { Name, Description, Price } = req.body;
    db.query('INSERT INTO Service (Name, Description, Price) VALUES (?, ?, ?)',
        [Name, Description, Price],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Service added successfully', serviceId: result.insertId });
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

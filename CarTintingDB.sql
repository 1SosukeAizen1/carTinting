CREATE DATABASE CarTintingDB;
USE CarTintingDB;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    Role VARCHAR(50) CHECK (Role IN ('admin', 'employee', 'customer'))
);

CREATE TABLE Client (
    ClientID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Address VARCHAR(100),
    Phone VARCHAR(15),
    PaymentDetails TEXT,
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
    VehicleDetails VARCHAR(100),
    TintType VARCHAR(50),
    Date DATE,
    Time TIME,
    Status VARCHAR(30),
    FOREIGN KEY (ClientID) REFERENCES Client(ClientID)
);

CREATE TABLE Service (
    ServiceID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    Description TEXT,
    Price DECIMAL(10,2) CHECK (Price >= 0)
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
    Amount DECIMAL(10,2) CHECK (Amount >= 0),
    Method VARCHAR(30),
    TransactionStatus VARCHAR(30),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Inventory (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    Quantity INT CHECK (Quantity >= 0),
    Supplier VARCHAR(50),
    ReorderLevel INT CHECK (ReorderLevel >= 0)
);

CREATE TABLE Notification (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Message TEXT,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Support (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Message TEXT,
    Status VARCHAR(30),
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

const express = require('express'); // Import express
const mysql = require('mysql2'); // Import MySQL
const bodyParser = require('body-parser'); // Import body-parser

// Initialize Express app
const app = express();

const cors = require('cors');
app.use(cors());

// Set the port
const port = 5000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'booking_system', // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// POST endpoint to store booking data
app.post('/api/book', (req, res) => {
  const { userId, bookingDate, bookingTime } = req.body;

  // Validate input data
  if (!userId || !bookingDate || !bookingTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert the booking data into the database
  const query = 'INSERT INTO booking_slots (user_id, booking_date, booking_time, status) VALUES (?, ?, ?, "booked")';
  const values = [userId, bookingDate, bookingTime];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting booking data:', err); // Log the error
      return res.status(500).json({ error: 'Failed to book the slot', details: err.message });
    }

    console.log('Booking successfully inserted with ID:', result.insertId);
    res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

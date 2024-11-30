const express = require('express'); // Import express
const mysql = require('mysql2'); // Import MySQL
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors'); // Import CORS

// Initialize Express app
const app = express();

// Use CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Set the port
const port = 5000;

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
  const query =
    'INSERT INTO booking_slots (user_id, booking_date, booking_time, status) VALUES (?, ?, ?, "booked")';
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

// POST endpoint to verify NID and generate token
function generateAndUpdateToken(nid, res) {
  // Use a fixed time, e.g., "10:00"
  const token = "10:00";

  console.log('Assigned Token:', token);

  // Update the `users` table with the assigned token
  const updateQuery = 'UPDATE users SET token = ? WHERE nid = ?';
  db.query(updateQuery, [token, nid], (err, updateResult) => {
    if (err) {
      console.error('Error updating the token in the database:', err);
      return res.status(500).send('Failed to update token');
    }

    console.log(`Token updated successfully for NID: ${nid}. Update result:`, updateResult);

    // Fetch updated details for the response from all three tables
    const fetchQuery = `
      SELECT 
        u.id AS user_id,
        u.nid AS user_nid,
        u.token AS user_token,
        nv.nid AS verified_nid,
        nv.updated_at AS verification_time,
        b.booking_time AS booking_time
      FROM 
        users u
      JOIN 
        nid_verifications nv ON u.nid = nv.nid
      JOIN 
        booking_slots b ON u.id = b.user_id
      WHERE 
        u.nid = ?
    `;

    db.query(fetchQuery, [nid], (err, userResult) => {
      if (err) {
        console.error('Error fetching user details:', err);
        return res.status(500).send('Failed to fetch user details');
      }

      console.log('Fetched User Result:', userResult);

      if (userResult.length > 0) {
        const { user_id, user_nid, user_token, verification_time, booking_time } = userResult[0];
        const formattedVerificationTime = new Date(verification_time).toLocaleString();
        const formattedBookingTime = new Date(booking_time).toLocaleString();

        console.log('Final Response Data:', {
          user_id,
          user_nid,
          user_token,
          verification_time: formattedVerificationTime,
          booking_time: formattedBookingTime,
        });

        // Return the data as an HTML table
        const htmlResponse = `
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 20px;
              }
              table {
                margin: 0 auto;
                border-collapse: collapse;
                width: 60%;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 10px;
              }
              th {
                background-color: #f4f4f4;
              }
              tr:nth-child(even) {
                background-color: #f9f9f9;
              }
            </style>
          </head>
          <body>
            <h2>NID Verification Result</h2>
            <table>
              <tr>
                <th>User ID</th>
                <th>NID</th>
                <th>Token</th>
                <th>Verification Time</th>
                <th>Booking Time</th>
              </tr>
              <tr>
                <td>${user_id}</td>
                <td>${user_nid}</td>
                <td>${user_token}</td>
                <td>${formattedVerificationTime}</td>
                <td>${formattedBookingTime}</td>
              </tr>
            </table>
          </body>
          </html>
        `;

        res.status(200).send(htmlResponse);
      } else {
        console.error('No user found after token update');
        return res.status(404).send('User not found after token update');
      }
    });
  });
}


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const donationRoutes = require('./donationRoutes');
const getDonationDetails = require('./getDonationDetails');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'Disaster'
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

db.getConnection()
  .then(() => {
    console.log('Connected to the database!');

    app.use('/auth', authRoutes(db));
    app.use('/api', donationRoutes(db));
    app.use('/api', getDonationDetails(db));
    

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    throw err;
  });

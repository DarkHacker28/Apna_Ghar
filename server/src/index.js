require('dotenv').config();
const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/properties');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Apna Ghar API is running 🏠', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`\n🏠 Apna Ghar Server running on http://localhost:${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health\n`);
});

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user store (simulates AWS Cognito + RDS)
const users = [];

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), name, email, password: hashedPassword, favorites: [], createdAt: new Date() };
    users.push(user);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, message: 'Account created!', token, user: { id: user.id, name, email, favorites: [] } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, favorites: user.favorites } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Demo login (no password needed for testing)
router.post('/demo', (req, res) => {
  const demoUser = { id: 'demo-001', name: 'Demo User', email: 'demo@apnaghar.in', favorites: ['1', '4'] };
  const token = jwt.sign({ id: demoUser.id, email: demoUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: demoUser });
});

module.exports = router;

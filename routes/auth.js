const express = require('express');
const db = require('../database/db');
const router = express.Router();

// Registration
router.get('/register', (req, res) => res.render('register'));
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], (err) => {
        if (err) return res.send('Error: Username already exists');
        res.redirect('/login');
    });
});

// Login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, user) => {
        if (err || !user) return res.send('Invalid credentials');
        res.redirect('/dashboard');
    });
});

// Dashboard
router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;

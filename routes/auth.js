const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/db'); // Your SQLite database connection

// Registration route
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err) => {
            if (err) return res.status(500).send('Error creating user');
            res.redirect('/auth/login');
        }
    );
});

// Login route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err || !user) {
            console.error('Error fetching user:', err ? err.message : 'User not found');
            return res.status(401).send('Invalid email or password');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Invalid email or password');
        }

        // Set session details
        req.session.username = user.username;

        // Save user session
        req.session.user = {
            id: user.id,
        };
        // console.log('User logged in:', user);
        res.redirect('/')
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
;
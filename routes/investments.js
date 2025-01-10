const express = require('express');
const router = express.Router();
const db = require('../database/db'); // SQLite database connection

router.get('/', async (req, res) => {
    try {
        const investments = await db.all('SELECT * FROM investments');
        res.render('investments', { title: 'Investment Opportunities', investments });
    } catch (err) {
        res.status(500).send('Error retrieving investments');
    }
});

module.exports = router;

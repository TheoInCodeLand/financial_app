const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Sample investment data
    const investments = [
        { name: 'Stock Market', description: 'High-risk, high-reward investments.' },
        { name: 'Real Estate', description: 'Stable long-term growth.' },
        { name: 'Savings Account', description: 'Low risk with minimal returns.' },
    ];
    res.render('investments', { investments });
});

module.exports = router;

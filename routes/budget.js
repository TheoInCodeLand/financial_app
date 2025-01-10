const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.get('/', (req, res) => res.render('budget'));

router.post('/', (req, res) => {
    const { income, debitOrders, currentExpenses, rent } = req.body;
    const totalExpenses = parseFloat(debitOrders) + parseFloat(currentExpenses) + parseFloat(rent);
    const disposableIncome = parseFloat(income) - totalExpenses;

    const advice = disposableIncome < 0 
        ? 'Reduce expenses and review your debit orders.'
        : disposableIncome < 1000 
        ? 'Focus on saving more or reducing unnecessary costs.'
        : 'Your finances are in a good state! Consider investments or savings.';

    res.render('budget', { income, totalExpenses, disposableIncome, advice });
});

module.exports = router;

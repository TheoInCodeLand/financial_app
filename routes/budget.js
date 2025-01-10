const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('budget', { title: 'Budget Planner', income: null });
});

router.post('/', (req, res) => {
    const { income, debitOrders, currentExpenses, rent } = req.body;

    const totalExpenses = parseFloat(debitOrders) + parseFloat(currentExpenses) + parseFloat(rent);
    const disposableIncome = income - totalExpenses;

    let advice = 'Manage your expenses wisely.';
    if (disposableIncome < 0) {
        advice = 'Your expenses exceed your income. Consider reducing unnecessary costs.';
    } else if (disposableIncome < income * 0.2) {
        advice = 'Try saving at least 20% of your income.';
    }

    res.render('budget', {
        title: 'Budget Planner',
        income,
        totalExpenses,
        disposableIncome,
        advice,
    });
});

module.exports = router;

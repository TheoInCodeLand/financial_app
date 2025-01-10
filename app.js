const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
// const authRoutes = require('./routes/auth');
// const budgetRoutes = require('./routes/budget');
// const investmentRoutes = require('./routes/investments');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
// app.use('/', authRoutes);
// app.use('/budget', budgetRoutes);
// app.use('/investments', investmentRoutes);

app.get('/', (req, res)=> {
    res.send('Server Running!')
})

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

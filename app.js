const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const investmentsRoutes = require('./routes/investments');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'financial_secret', resave: false, saveUninitialized: true }));

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
}

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public Routes
app.get('/', (req, res) => {
    if (!req.session.user) {
        res.render('home', { user: null }); // Render home page
    } else {
        res.redirect('/dashboard'); // Redirect authenticated users
    }
});

// Protected Routes
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user }); // Render dashboard
});

// Routes
app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);
app.use('/investments', investmentsRoutes);

// 404 Handler
app.use((req, res) => res.status(404).send('Page not found'));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

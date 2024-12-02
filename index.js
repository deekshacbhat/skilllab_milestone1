const express = require('express');
const bodyParser = require('body-parser');
const habitRoutes = require('./routes/habits');
const app = express();
const PORT = 3000;
const cron = require('cron');
const { getAllHabits } = require('./models/habitModel');

const sendDailyReminders = new cron.CronJob('0 9 * * *', () => { // 9 AM daily
    const habits = getAllHabits();
    habits.forEach(habit => {
        console.log(`Reminder: Don't forget to complete your habit "${habit.name}" today!`);
    });
});

sendDailyReminders.start();

// Middleware
app.use(bodyParser.json());
app.use('/habits', habitRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

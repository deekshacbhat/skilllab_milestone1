const express = require('express');
const router = express.Router();
const habitModel = require('../models/habitModel');

// Add Habit
router.post('/', (req, res) => {
    const { name, dailyGoal } = req.body;
    const newHabit = {
        id: Date.now().toString(),
        name,
        dailyGoal,
        progress: []
    };
    habitModel.addHabit(newHabit);
    res.status(201).json({ status: 'success', data: newHabit });
});

// Get All Habits
router.get('/', (req, res) => {
    const habits = habitModel.getAllHabits();
    res.status(200).json({ status: 'success', data: habits });
});

// Update Habit Progress
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { date } = req.body;
    const updatedHabit = habitModel.updateHabit(id, date);
    if (updatedHabit) {
        res.status(200).json({ status: 'success', message: 'Habit updated successfully' });
    } else {
        res.status(404).json({ status: 'error', message: 'Habit not found' });
    }
});

// Weekly Report
router.get('/report', (req, res) => {
    const report = habitModel.generateWeeklyReport();
    res.status(200).json({ status: 'success', data: report });
});

module.exports = router;

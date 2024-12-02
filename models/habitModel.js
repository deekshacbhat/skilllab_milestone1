let habits = [];

module.exports = {
    getAllHabits: () => habits,
    addHabit: (habit) => {
        habits.push(habit);
        return habit;
    },
    updateHabit: (id, date) => {
        const habit = habits.find(h => h.id === id);
        if (habit) {
            habit.progress.push({ date, completed: true });
            return habit;
        }
        return null;
    },
    generateWeeklyReport: () => {
        return habits.map(habit => {
            const last7Days = [...Array(7).keys()].map(i => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                return date.toISOString().split('T')[0];
            });

            const weeklyProgress = last7Days.map(date => {
                return habit.progress.some(p => p.date === date && p.completed);
            });

            return {
                habit: habit.name,
                completion: weeklyProgress
            };
        });
    }
};

const express = require('express');
const router = express.Router();

// Middleware to attach db to req
const attachDbMiddleware = (db) => (req, res, next) => {
    req.db = db; // Make the db accessible in the request object
    next();
};

// Export a function that takes db as a parameter
module.exports = (db) => {
    router.use(attachDbMiddleware(db));

    // Get tasks for a specific volunteer
    router.get('/volunteer/:volunteerId/tasks', async (req, res) => {
        const volunteerId = req.params.volunteerId;

        try {
            const [tasks] = await req.db.execute('SELECT * FROM VolunteerTask WHERE assigned_volunteer = ?', [volunteerId]);
            res.json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Get all tasks
    router.get('/tasks', async (req, res) => {
        try {
            const [tasks] = await req.db.execute('SELECT * FROM VolunteerTask');
            res.json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Update task status
    router.put('/volunteer/task/:taskId', async (req, res) => {
        const taskId = req.params.taskId;
        const { status } = req.body;

        try {
            await req.db.execute('UPDATE VolunteerTask SET status = ? WHERE id = ?', [status, taskId]);
            res.status(200).json({ message: 'Task status updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router; // Return the router instance
};

const express = require('express');
const router = express.Router();
const UserProgress = require('../Models/UserProgress');

router.post('/save', async (req, res) => {
    const { username, topicName, completedQuestions, bookmarkedQuestions, notes } = req.body;

    try {
        let progress = await UserProgress.findOne({ username, topicName });

        
        const completionPercentage = completedQuestions.length > 0 
            ? (completedQuestions.length / (completedQuestions.length + bookmarkedQuestions.length)) * 100 
            : 0;

        if (progress) {
            progress.completedQuestions = completedQuestions;
            progress.bookmarkedQuestions = bookmarkedQuestions;
            progress.notes = notes;
            progress.completionPercentage = completionPercentage;
        } else {
            progress = new UserProgress({ username, topicName, completedQuestions, bookmarkedQuestions, notes, completionPercentage });
        }

        await progress.save();
        res.json({ success: true, progress });
    } catch (error) {
        console.error('Error saving progress:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/:username/:topicName', async (req, res) => {
    const { username, topicName } = req.params;

    try {
        const progress = await UserProgress.findOne({ username, topicName });
        res.json(progress || {});
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;

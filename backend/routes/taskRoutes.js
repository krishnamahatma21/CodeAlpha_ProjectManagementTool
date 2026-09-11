const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  addCommentToTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createTask);
router.get('/project/:projectId', protect, getTasksByProject);
router.patch('/:id/status', protect, updateTaskStatus);
router.post('/:id/comments', protect, addCommentToTask);

module.exports = router;
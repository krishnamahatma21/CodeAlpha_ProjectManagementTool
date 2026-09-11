const express = require('express');
const router = express.Router();
const { createProject, getMyProjects, getProjectById } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createProject)
  .get(protect, getMyProjects);

router.get('/:id', protect, getProjectById);

module.exports = router;
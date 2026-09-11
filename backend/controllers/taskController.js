const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, status } = req.body;
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo: assignedTo || null,
      priority: priority || 'Medium',
      status: status || 'To Do',
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('assignedTo', 'name email');
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCommentToTask = async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments.push({
      user: req.user._id,
      userName: req.user.name,
      text,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasksByProject, updateTaskStatus, addCommentToTask };
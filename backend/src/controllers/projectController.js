const Project = require('../models/Project');
const Task = require('../models/Task');
const AppError = require('../utils/appError');

exports.createProject = async (req, res, next) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      admin: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      data: { project: newProject },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    // Admins see all, Members see only where they are added or admin
    let query = {};
    if (req.user.role !== 'Admin') {
      query = {
        $or: [
          { admin: req.user._id },
          { members: req.user._id }
        ]
      };
    }

    const projects = await Project.find(query).populate('admin members', 'name email');

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: { projects },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('admin members', 'name email');

    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { project },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { project },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(new AppError('No project found with that ID', 404));
    }

    // Use the ID from the found project to delete tasks
    await Task.deleteMany({ project: project._id });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

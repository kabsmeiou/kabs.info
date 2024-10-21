const router = require('express').Router();
let Project = require('../models/project.model');

// default route for projects that returns the list of projects
router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adding new projects
router.route('/add').post((req, res) => {
  const projectTitle = req.body.projectTitle;
  const description = req.body.description;
  const skillTags = req.body.skillTags;
  const projectLink = req.body.projectLink;
  const date = Date.parse(req.body.date);

  const newProject = new Project({
    projectTitle,
    description,
    skillTags,
    projectLink,
    date,
  });

  newProject.save()
    .then(() => res.json('Project added.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// getting specific project
router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
})

// deleting specific project
router.route('/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project deleted from the list.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

// deleting specific project
router.route('/update/:id').post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      // replace content
      project.description = req.body.description;
      project.skillTags = req.body.skillTags;
      project.projectLink = req.body.projectLink;

      project.save()
        .then(() => res.json('Changes to project has been applied.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// marking specific project as completed/unfinished
router.route('/status/:id').post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      // set completed as the current date or set to null.
      if (project.completed === null) {
        project.completed = Date.parse(req.body.completedDate);
      } else {
        project.completed = null;
      }
      
      project.save()
        .then(() => res.json('Project status toggled.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
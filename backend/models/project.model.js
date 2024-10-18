const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectTitle: {type: String, required: true},
  description: {type: String, required: true},
  skillTags: {type: Array, required: true},
  projectLink: {type: String, required: true},
  date: {type: Date, required: true}
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
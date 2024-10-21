import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectTitle: {type: String, required: true},
  description: {type: String, required: true},
  skillTags: {type: Array, required: true},
  projectLink: {type: String, required: true},
  date: {type: Date, required: true},
  completed: {type: Date, default: null}
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
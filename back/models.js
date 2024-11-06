import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    project: String,
    title: String,
    description: String,
    assignee: String,
    priority: { type: String, default: 'medium' },
    createdAt: { type: Date, default: Date.now }
});

const SprintSchema = new mongoose.Schema({
    project : String,
    name: String,
    startDate: Date,
    endDate: Date,
});

const TeamMemberSchema = new mongoose.Schema({
    project: String,
    name: String,
    role: String,
    joinedAt: { type: Date, default: Date.now }
});

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    tasks: [TaskSchema],
    sprints: [SprintSchema],
    teamMembers: [TeamMemberSchema],
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);
const Task = mongoose.model('Task', TaskSchema);
const Sprint = mongoose.model('Sprint', SprintSchema);
const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);

export { Project, Task, Sprint, TeamMember };
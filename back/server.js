// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProjectManagementBot from './ProjectManagementBot.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const apiKey = process.env.OPENAI_API_KEY;

const bot = new ProjectManagementBot(apiKey);

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello from Node.js + MongoDB !');
});

app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Le message est requis' });
  }

  const result = await bot.sendMessage(message);

  if (result.status === 'success') {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

// app.post('/create-project', async (req, res) => {
//   const { projectName, description } = req.body;

//   if (!projectName || !description) {
//     return res.status(400).json({ error: 'Le nom du projet et la description sont requis' });
//   }

//   const result = await bot.createProject(projectName, description);

//   if (result.status === 'success') {
//     res.json(result);
//   } else {
//     res.status(500).json(result);
//   }
// });

// app.post('/add-task', async (req, res) => {
//   const { projectName, taskTitle, description, assignee, priority } = req.body;

//   if (!projectName || !taskTitle || !description) {
//     return res.status(400).json({ error: 'Le nom du projet et le nom de la tâche sont requis' });
//   }

//   const result = await bot.addTask(projectName, taskTitle, description, assignee, priority);

//   if (result.status === 'success') {
//     res.json(result);
//   } else {
//     res.status(500).json(result);
//   }
// });

// app.post('/create-sprint', async (req, res) => {
//   const { projectName, sprintName, startDate, endDate } = req.body;

//   if (!projectName || !sprintName || !startDate || !endDate) {
//     return res.status(400).json({ error: 'Le nom du projet, le nom du sprint et la description sont requis' });
//   }

//   const result = await bot.createSprint(projectName, sprintName, startDate, endDate);

//   if (result.status === 'success') {
//     res.json(result);
//   } else {
//     res.status(500).json(result);
//   }
// });

// app.get('/get-team-status', async (req, res) => {
//   const { projectName } = req.body;

//   if (!projectName) {
//     return res.status(400).json({ error: 'Le nom du projet est requis' });
//   }

//   const result = await bot.getTeamStatus(projectName);

//   if (result.status === 'success') {
//     res.json(result);
//   } else {
//     res.status(500).json(result);
//   }
// });

// app.post('/add-team-member', async (req, res) => {
//   const { projectName, memberName, role } = req.body;

//   if (!projectName || !memberName || !role) {
//     return res.status(400).json({ error: 'Le nom du projet, le nom du membre et le rôle sont requis' });
//   }

//   const result = await bot.addTeamMember(projectName, memberName, role);

//   if (result.status === 'success') {
//     res.json(result);
//   } else {
//     res.status(500).json(result);
//   }
// });

app.listen(PORT, () => console.log(`Serveur backend en écoute sur le port ${PORT}`));

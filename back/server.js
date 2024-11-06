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
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connecté à MongoDB'))
//   .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello from Node.js + MongoDB !');
});

app.post('/create-project', async (req, res) => {
  const { projectName, description } = req.body;

  if (!projectName || !description) {
    return res.status(400).json({ error: 'Le nom du projet et la description sont requis' });
  }

  const result = await bot.createProject(projectName, description);

  if (result.status === 'success') {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

app.listen(PORT, () => console.log(`Serveur backend en écoute sur le port ${PORT}`));

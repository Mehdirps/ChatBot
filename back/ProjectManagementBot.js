import OpenAI from "openai";
import { Project, Task, Sprint, TeamMember } from './models.js';

class ProjectManagementBot {
    constructor(apiKey) {
        this.client = new OpenAI({
            apiKey: apiKey
        });

    }

    async generateResponse(prompt) {
        try {
            const response = await this.client.chat.completions.create({
                model: "gpt-4o",
                max_tokens: 1000,
                temperature: 0.7,
                messages: [
                    { role: "system", content: "Tu es un assistant de gestion de projet professionnel. Tu aides à gérer les tâches, planifier les sprints et faciliter la communication d'équipe." },
                    { role: "user", content: prompt }
                ]
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error('Erreur lors de la génération de la réponse:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async createProject(projectName, description) {
        try {
            const project = new Project({
                name: projectName,
                description
            });

            await project.save();

            const prompt = `Un nouveau projet '${projectName}' a été créé avec la description : ${description}. Peux-tu suggérer les prochaines étapes pour bien démarrer ce projet?`;
            const response = await this.generateResponse(prompt);

            return {
                status: 'success',
                project,
                nextSteps: response
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    async addTask(projectName, taskTitle, description, assignee = null, priority = 'medium') {
        try {
            const project = await Project.findOne({ name: projectName });
            if (!project) {
                throw new Error('Projet non trouvé');
            }

            const task = new Task({
                project: projectName,
                title: taskTitle,
                description,
                assignee,
                priority
            });

            project.tasks.push(task);
            await project.save();
            await task.save();

            const prompt = `Une nouvelle tâche '${taskTitle}' a été créée pour le projet '${projectName}'. ${
                assignee ? `Assignée à ${assignee}` : 'Non assignée'
            }. Peux-tu analyser cette tâche et suggérer des points d'attention ou des recommandations?`;

            const analysis = await this.generateResponse(prompt);

            return {
                status: 'success',
                task,
                analysis
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    async createSprint(projectName, sprintName, startDate, endDate) {
        try {
            const project = await Project.findOne({ name: projectName });
            if (!project) {
                throw new Error('Projet non trouvé');
            }

            const sprint = new Sprint({
                project: projectName,
                name: sprintName,
                startDate,
                endDate
            });

            project.sprints.push(sprint);
            await project.save();
            await sprint.save();

            const prompt = `Un nouveau sprint '${sprintName}' a été créé pour le projet '${projectName}'. Quelles sont les meilleures pratiques à suivre pour ce sprint?`;
            const recommendations = await this.generateResponse(prompt);

            return {
                status: 'success',
                sprint,
                recommendations
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    async getTeamStatus(projectName) {
        try {
            const project = await Project.findOne({ name: projectName });
            if (!project) {
                throw new Error('Projet non trouvé');
            }

            const prompt = `
                Analyse l'état actuel du projet '${projectName}':
                - Nombre de tâches: ${project.tasks.length}
                - Membres de l'équipe: ${project.teamMembers.map(member => member.name).join(', ') || 'Aucun membre'}
                - Sprints en cours: ${project.sprints.length}
                
                Peux-tu fournir une analyse de la situation et des recommandations?
            `;

            const analysis = await this.generateResponse(prompt);

            return {
                status: 'success',
                projectStats: {
                    taskCount: project.tasks.length,
                    teamSize: project.teamMembers.length,
                    sprintCount: project.sprints.length
                },
                analysis
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    async addTeamMember(projectName, memberName, role) {
        try {
            const project = await Project.findOne({ name: projectName });
            if (!project) {
                throw new Error('Projet non trouvé');
            }

            const member = new TeamMember({
                project: projectName,
                name: memberName,
                role
            });

            project.teamMembers.push(member);
            await project.save();
            await member.save();

            const prompt = `Un nouveau membre '${memberName}' avec le rôle '${role}' a rejoint le projet '${projectName}'. Quelles recommandations as-tu pour faciliter son intégration?`;
            const recommendations = await this.generateResponse(prompt);

            return {
                status: 'success',
                member,
                recommendations
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }
}

export default ProjectManagementBot;
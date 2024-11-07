import React from 'react';
import { useState } from 'react';

const PromptForm = () => {

    const [message, setMessage] = useState([]);
    const [type, setType] = useState([]);
    const [blocks, setBlocks] = useState([
        {
            content: (
                <div class="d-flex flex-row justify-content-start mb-4">
                    <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
                        <p className="small mb-0">
                            Bonjour Je suis le chatBot, comment puis-je vous aider?
                        </p>
                    </div>
                </div >
            )
        },
        {
            content: (
                <div class="d-flex flex-row justify-content-start mb-4">
                    <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
                        <p className="small mb-0">
                            <button type="button" className="btn btn-secondary m-1" data-type={"project"} onClick={(e) => handleChoice(e)}>Créer un projet</button>
                            <button type="button" className="btn btn-secondary m-1" data-type={"task"} onClick={(e) => handleChoice(e)}>Créer une tache</button>
                            <button type="button" className="btn btn-secondary m-1" data-type={"sprint"} onClick={(e) => handleChoice(e)}>Créer un sprint</button>
                            <button type="button" className="btn btn-secondary m-1" data-type={"member"} onClick={(e) => handleChoice(e)}>Créer un membre</button>
                        </p>
                    </div>
                </div >
            )
        }
    ]);

    const addBlock = () => {
        const newBlock = {
            content: (
                <div className="bg-primary text-white rounded p-2">
                    <p className="mb-0">
                        <button type="button" className="btn btn-secondary m-1">Nouveau bloc</button>
                    </p>
                </div>
            )
        };
        setBlocks([...blocks, newBlock]);
    };

    const handleChoice = (e) => {
        const type = e.target.getAttribute('data-type');
        switch (type) {
            case 'project':
                setType('project');
                blocks.push({
                    content: (
                        <div className="d-flex flex-row justify-content-start mb-4">
                            <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
                                Quel est le nom du projet? et sa description?
                            </div>
                        </div >
                    )
                });
                break;
            case 'task':
                setType('task');
                blocks.push({
                    content: (
                        <div class="d-flex flex-row justify-content-start mb-4">
                            <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
                                <p className="small mb-0">
                                   Sur quel projet voulez-vous ajouter une tâche? Quel est le titre de la tâche? Quelle est la description de la tâche? Qui est le responsable de la tâche? Quelle est la priorité de la tâche ?
                                </p>
                            </div>
                        </div >
                    )
                });
                break;
            case 'sprint':
                setType('sprint');
                blocks.push({
                    content: (
                        <div class="d-flex flex-row justify-content-start mb-4">
                            <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
                                Que voulez-vous ajouter un sprint? Quel est le nom du projet? Quel est le nom du sprint? Quelle est la date de début du sprint? Quelle est la date de fin du sprint?
                            </div>
                        </div >
                    )
                });
                break;
            case 'member':
                setType('member');
                blocks.push({
                    content: (
                        <div class="d-flex flex-row justify-content-start mb-4">
                            <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
                                <p className="small mb-0">
                                   Dans quel projet voulez-vous ajouter un membre? Quel est le nom du membre? Quel est le rôle du membre?
                                </p>
                            </div>
                        </div >
                    )
                });
                break;
            default:
                break;
        }
    }

    const sendMessage = () => {
        fetch('http://localhost:5000/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="container">
            <section>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-4">

                            <div className="card" id="chat1" style={{ borderRadius: '15px' }}>
                                <div
                                    className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                                    style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                                    <i className="fas fa-angle-left"></i>
                                    <p className="mb-0 fw-bold">ChatBot</p>
                                    <i className="fas fa-times"></i>
                                </div>
                                {blocks.map(block => (
                                    <>
                                        {block.content}
                                    </>
                                ))}
                                <div className="card-body">
                                    <div data-mdb-input-init className="form-outline">
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            sendMessage();
                                        }}>
                                            <textarea className="form-control bg-body-tertiary" id="textAreaExample" rows="4" onChange={(e) => setMessage(e.target.value)}></textarea>
                                            <button type="submit" className="btn btn-primary mt-3">Send</button>
                                        </form>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default PromptForm;
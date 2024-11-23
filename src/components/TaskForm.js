import React, { useState, useEffect } from 'react';

function TaskForm({ onClose, onSaveTask, onDeleteTask, taskToEdit }) {
    // Estado para armazenar o título e descrição da tarefa
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(''); // Estado para o prazo

    // Atualiza o estado do título caso esteja editando uma tarefa
    useEffect(() => {
        if (taskToEdit) {
            setTaskTitle(taskToEdit.title);
            setTaskDescription(taskToEdit.description || ''); 
            setTags(taskToEdit.tags || []);
            setPriority(taskToEdit.priority || ''); 
            setDueDate(taskToEdit.dueDate || ''); 
        }
    }, [taskToEdit]);

    // Função para lidar com o salvamento da tarefa
    const handleSave = () => {
        if (taskTitle.trim() === '') {
            alert('O título da tarefa não pode estar vazio!');
            return;
        }
        onSaveTask({
            id: taskToEdit ? taskToEdit.id : Date.now(), // Reutiliza o ID para edição
            title: taskTitle,
            description: taskDescription, // Inclui a descrição
            tags, // Salva as etiquetas selecionadas
            priority, // Inclui prioridade
            dueDate, //Salva o prazo 
            completed: taskToEdit ? taskToEdit.completed : false, // Mantém o estado de completude
        });
        setTaskTitle(''); // Limpa o campo do título
        setTaskDescription('');
        setTags([]);
        setPriority('');
        setDueDate(''); // Limpa o prazo
        onClose(); // Fecha o formulário
    };

    // Função para excluir a tarefa
    const handleDelete = () => {
        if (taskToEdit) {
            onDeleteTask(taskToEdit.id);
            onClose(); // Fecha o formulário
        }
    };
    // Adiciona ou remove etiquetas selecionadas
    const handleTagClick = (tag) => {
        setTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );
    };
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    return (
        <div className="task-form">
            {/* Botão de fechar (X) */}
            <button onClick={onClose} className="close-button">
                ✖
            </button>

            {/* Caixa de texto para o título da tarefa */}
            <input
                type="text"
                className="task-form-title-input"
                placeholder="Digite o título da tarefa"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)} // Atualiza o estado ao digitar
            />

            {/* Descrição */}
            <textarea
                placeholder="Descrição"
                className="task-form-textarea"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            {/* Prazo */}
            <h4 className="task-form-label">Prazo de conclusão:</h4>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            {/* Etiquetas */}
            <h4 className="task-form-label">Etiquetas:</h4>
            <div className="tags-container">
                {['TRABALHO', 'ESTUDO', 'FAMÍLIA'].map((tag) => (
                    <span
                        key={tag}
                        className={`tag ${tags.includes(tag) ? 'selected' : ''}`}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Nível de Prioridade */}
            <h4 className="task-form-label">Nível de Prioridade:</h4>
            <div className="priority-options">
            {['BAIXO', 'MÉDIO', 'ALTO'].map((level) => (
                    <label key={level}>
                        <input
                            type="radio"
                            name="priority"
                            value={level}
                            checked={priority === level}
                            onChange={handlePriorityChange}
                        />
                        {level}
                        </label>
                ))}
            </div>

            {/* Botões de ação */}
            <div className="task-form-buttons">
                <button className="delete-button" onClick={handleDelete} disabled={!taskToEdit}>
                    EXCLUIR
                </button>
                <button className="save-button" onClick={handleSave}>
                    SALVAR
                </button>
            </div>
        </div>
    );
}

export default TaskForm;

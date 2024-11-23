import React from 'react';

function TaskList({ tasks, onAddTask, onEditTask, onCompleteTask, activeFilter }) {
    // Aplica os filtros
    const filteredTasks = tasks.filter((task) => {
        if (activeFilter.type === 'tag' && !task.tags.includes(activeFilter.value)) {
            return false;
        }
        if (activeFilter.type === 'priority' && task.priority !== activeFilter.value) {
            return false;
        }
        if (activeFilter.type === 'status') {
            if (activeFilter.value === 'Atrasado') {
                return task.status === 'Atrasado';
            }
            if (activeFilter.value === 'Em Dia') {
                return task.status === 'Em Dia';
            }
            if (activeFilter.value === 'Concluído') {
                return task.completed;
            }
        }
        return true;
    });

    // Divide as tarefas filtradas entre concluídas e não concluídas
    const incompleteTasks = filteredTasks.filter((task) => !task.completed);
    const completedTasks = filteredTasks.filter((task) => task.completed);

    return (
        <div className="task-list">
            {/* Cabeçalho flexível com título e botão */}
            <div className="task-list-header">
                <h2>Lista de Tarefas</h2>
                {/* Botão com "+" que dispara o pop-up */}
                <button className="add-task-button" onClick={onAddTask}>
                    +
                </button>
            </div>

            {incompleteTasks.length > 0 || completedTasks.length > 0 ? (
                <>
                    {/* Renderiza as tarefas incompletas */}
                    {incompleteTasks.map((task) => (
                        <div key={task.id} className="task">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onCompleteTask(task.id)}
                            />
                            <span>{task.title}</span>
                            {/* Botão de edição */}
                            <button
                                className="edit-task-button"
                                onClick={() => onEditTask(task.id)}
                            >
                                ✎
                            </button>
                        </div>
                    ))}

                    {/* Linha divisória */}
                    {completedTasks.length > 0 && <hr className="task-divider" />}

                    {/* Renderiza as tarefas concluídas */}
                    {completedTasks.map((task) => (
                        <div key={task.id} className="task completed-task">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onCompleteTask(task.id)}
                            />
                            <span>{task.title}</span>
                        </div>
                    ))}
                </>
            ) : (
                <p>Não há tarefas disponíveis. Adicione uma nova tarefa!</p>
            )}
        </div>
    );
}

export default TaskList;

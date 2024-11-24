import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';  // Barra de progresso das tarefas concluídas
import TaskForm from './components/TaskForm';
import TagProgressBar from './components/TagProgressBar';  // Barra de progresso das etiquetas

function App() {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [filter, setFilter] = useState({ tag: '', priority: '', status: '' });

    useEffect(() => {
        const currentDate = new Date();
        const updatedTasks = tasks.map((task) => {
            const isOverdue = task.dueDate && new Date(task.dueDate) < currentDate && !task.completed;
            const isOnTime = task.dueDate && new Date(task.dueDate) >= currentDate && !task.completed;
            return { ...task, status: isOverdue ? 'Atrasado' : isOnTime ? 'Em Dia' : task.status };
        });
        setTasks(updatedTasks);
    }, [tasks]);

    const handleOpenForm = () => {
        setTaskToEdit(null);
        setShowTaskForm(true);
    };

    const handleCloseForm = () => setShowTaskForm(false);

    const handleSaveTask = (newTask) => {
        if (taskToEdit) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskToEdit.id ? { ...task, ...newTask } : task
                )
            );
        } else {
            setTasks([...tasks, newTask]);
        }
        setShowTaskForm(false);
    };

    const handleEditTask = (taskId) => {
        const task = tasks.find((task) => task.id === taskId);
        setTaskToEdit(task);
        setShowTaskForm(true);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setShowTaskForm(false);
    };

    const handleFilterChange = (updatedFilter) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            ...updatedFilter,
        }));
    };

    const handleClearFilter = () => {
        setFilter({ tag: '', priority: '', status: '' });
    };

    const handleCompleteTask = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        const tagMatch = !filter.tag || (Array.isArray(task.tags) && task.tags.includes(filter.tag));
        const priorityMatch = !filter.priority || task.priority === filter.priority;
        const statusMatch =
            !filter.status ||
            (filter.status === 'Concluído' && task.completed) ||
            (filter.status === 'Atrasado' && new Date(task.dueDate) < new Date() && !task.completed) ||
            (filter.status === 'Em Dia' && new Date(task.dueDate) >= new Date() && !task.completed);

        return tagMatch && priorityMatch && statusMatch;
    });

    // Filtra apenas as tarefas não concluídas para a TagProgressBar
    const pendingTasks = filteredTasks.filter(task => !task.completed);

    return (
        <div className="app">
            <h1>Gerenciador de Tarefas</h1>
            <div className="main">
                <Sidebar
                    tags={['TRABALHO', 'ESTUDO', 'FAMÍLIA']}
                    priorities={['BAIXO', 'MÉDIO', 'ALTO']}
                    onFilterChange={handleFilterChange}
                    onClearFilter={handleClearFilter}
                />
                <TaskList
                    tasks={filteredTasks}
                    onAddTask={handleOpenForm}
                    onEditTask={handleEditTask}
                    onCompleteTask={handleCompleteTask}
                    activeFilter={filter}
                />
                <div className="progress-bars">
                    {/* Barra de progresso das tarefas concluídas */}
                    <ProgressBar tasks={tasks} />

                    {/* Barra de progresso das etiquetas */}
                    <TagProgressBar tasks={pendingTasks} />
                </div>
            </div>

            {showTaskForm && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <TaskForm
                            onClose={handleCloseForm}
                            onSaveTask={handleSaveTask}
                            onDeleteTask={handleDeleteTask}
                            taskToEdit={taskToEdit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

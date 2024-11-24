import React from 'react';

function ProgressBar({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <h2 className="progress-bar-header">Tarefas Concluídas</h2>
      <div
        className="progress-bar-circle"
        style={{
        }}
      >
        <span
          className="progress-bar-percentage"
          style={{
            position: 'absolute',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333', // Cor do texto
          }}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;

import React from 'react';

function ProgressBar({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <h2 className="progress-bar-header">Progresso</h2>
      <div
        className="progress-bar-circle"
        style={{
          background: `conic-gradient(#4CAF50 ${percentage}%, #ddd ${percentage}% 100%)`,
        }}
      >
        <span className="progress-bar-percentage">{percentage}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;

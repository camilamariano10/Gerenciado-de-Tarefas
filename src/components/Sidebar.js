import React from 'react';

function Sidebar({ tags, priorities, onFilterChange, onClearFilter }) {
    return (
        <div className="sidebar">
            {/* Filtro por Etiquetas */}
            <h3>Etiquetas</h3>
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="tag"
                    onClick={() => onFilterChange({ type: 'tag', value: tag })}  // Filtro para etiquetas
                >
                    {tag}
                </span>
            ))}

            {/* Filtro por Status */}
            <h3>Status</h3>
            <div>
                <span
                    className="status-filter"
                    onClick={() => onFilterChange({ type: 'status', value: 'Atrasado' })}
                >
                    ATRASADO
                </span>
                <span
                    className="status-filter"
                    onClick={() => onFilterChange({ type: 'status', value: 'Em Dia' })}
                >
                    EM DIA
                </span>
                <span
                    className="status-filter"
                    onClick={() => onFilterChange({ type: 'status', value: 'Concluído' })}
                >
                    CONCLUÍDO
                </span>
            </div>

            {/* Filtro por Prioridade */}
            <h3>Nível de Prioridade</h3>
            <div>
                {priorities.map((priority) => (
                    <span
                        key={priority}
                        className="priority-filter"
                        onClick={() => onFilterChange({ type: 'priority', value: priority })}// Filtro para prioridade
                    >
                        {priority}
                    </span>
                ))}
            </div>

            {/* Botão de Limpar Filtro */}
            <div className="clear-filter-container">
                <button onClick={onClearFilter} className="clear-filter-button">
                    Limpar Filtro
                </button>
            </div>
        </div>
    );
}

export default Sidebar;

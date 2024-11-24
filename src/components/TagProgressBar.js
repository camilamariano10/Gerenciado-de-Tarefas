import React, { useEffect, useState } from 'react';

function TagProgressBar({ tasks }) {
  // Filtra as tarefas pendentes
  const pendingTasks = tasks.filter(task => task.status !== 'concluída');

  // Total de tarefas pendentes
  const totalTasks = pendingTasks.length;

  // Contagem de tarefas por etiqueta nas tarefas pendentes
  const tagCounts = pendingTasks.reduce((acc, task) => {
    task.tags?.forEach((tag) => {
      acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
    });
    return acc;
  }, {});

  // Etiquetas que queremos rastrear
  const tags = ['TRABALHO', 'ESTUDO', 'FAMÍLIA'];

  // Calcula o progresso de cada etiqueta (em porcentagem)
  const tagProgress = tags.map((tag) => ({
    tag,
    percentage: totalTasks > 0 ? Math.round((tagCounts[tag] || 0) / totalTasks * 100) : 0,
  }));

  // Gera os segmentos para o círculo progressivo
  let currentOffset = 0;
  const circleSegments = tagProgress.map(({ tag, percentage }) => {
    const segment = {
      tag,
      start: currentOffset,
      end: currentOffset + percentage,
      percentage,
    };
    currentOffset += percentage;
    return segment;
  });

  // Ajuste para garantir que o progresso total será 100% (caso o somatório das porcentagens não atinja 100)
  const totalPercentage = circleSegments.reduce((acc, segment) => acc + segment.percentage, 0);
  if (totalPercentage < 100) {
    const remainingPercentage = 100 - totalPercentage;
    circleSegments[circleSegments.length - 1].end += remainingPercentage;
  }

  // Cor predominante (inicialmente cinza claro)
  const [dominantColor, setDominantColor] = useState('#ddd');

  // Atualiza a cor predominante após a inserção de tarefas
  useEffect(() => {
    if (totalTasks === 0 || Object.keys(tagCounts).length === 0) {
      // Se não houver tarefas ou se não houver tags, a cor será cinza claro
      setDominantColor('#ddd');
    } else {
      const totalTags = pendingTasks.reduce((acc, task) => {
        task.tags?.forEach((tag) => {
          acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
        });
        return acc;
      }, {});

      const maxTag = Object.entries(totalTags).reduce((max, [tag, count]) => {
        return count > max.count ? { tag, count } : max;
      }, { tag: null, count: 0 });

      if (maxTag.tag) {
        setDominantColor(getColorForTag(maxTag.tag));
      }
    }
  }, [pendingTasks, tagCounts, totalTasks]);

  return (
    <div className="progress-bar-container">
      <h2>Categoria</h2>
      <div className="progress-bar">
        <div
          className="progress-bar-circle"
          style={{
            background: totalTasks === 0 ? '#ddd' : `conic-gradient(
              ${circleSegments.map(
                (segment) => `${getColorForTag(segment.tag)} ${segment.start}% ${segment.end}%`
              ).join(', ')},
              ${dominantColor} ${circleSegments[circleSegments.length - 1].end}% 100%
            )`,
          }}
        >
        </div>
        <div className="legend">
          {tags.map((tag) => (
            <div key={tag} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: getColorForTag(tag) }}
              />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Função para obter uma cor para cada etiqueta
function getColorForTag(tag) {
  const colors = {
    TRABALHO: '#4CAF50',
    ESTUDO: '#2196F3',
    FAMÍLIA: '#D2B48C',
  };
  return colors[tag] || '#ddd'; // Cor padrão caso a etiqueta não esteja mapeada
}

export default TagProgressBar;

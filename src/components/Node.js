import React from 'react';

export default function HomePage({ col, row, isStart, isFinish, onNodeClick }) {
  const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : '';

  return (
    <div 
      className={`node ${extraClassName}`}
      onClick={() => onNodeClick(col, row)}>
    </div>
  );
}

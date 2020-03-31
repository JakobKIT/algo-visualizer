import React from 'react';

export default function HomePage({
  col,
  row,
  isStart,
  isFinish,
  isWall,
  onNodeClick,
  handleMouseDown,
  handleMouseUp,
  handleMouseOver
}) {
  const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

  return (
    <div 
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onClick={() => onNodeClick(col, row)}
      onMouseDown={() => handleMouseDown(col, row)}
      onMouseEnter={() => handleMouseOver(col, row)}
      onMouseUp={() => handleMouseUp()}>
    </div>
  );
}

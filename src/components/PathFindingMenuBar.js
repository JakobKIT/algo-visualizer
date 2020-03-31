import React from 'react';

export default function PathFindingMenuBar({
  selectStartNode,
  selectFinishNode,
  toggleWallDraw,
  isStartClicked,
  isFinishClicked,
  isDrawWall,
  startDijkstra
}) {
  const startCss = isStartClicked ? 'btn btn-secondary btn-active' : 'btn btn-secondary';
  const finishCss = isFinishClicked ? 'btn btn-secondary btn-active' : 'btn btn-secondary';
  const drawCss = isDrawWall ? 'btn btn-secondary btn-active' : 'btn btn-secondary';

  return (
    <div className="btn-group menu-bar" role="group">
      <button onClick={selectStartNode} type="button" className={`${startCss}`}>Select Start</button>
      <button onClick={selectFinishNode} type="button" className={`${finishCss}`}>Select End</button>
      <button onClick={toggleWallDraw} type="button" className={`${drawCss}`}>Draw Wall</button>
      <button onClick={startDijkstra} type="button" className="btn btn-secondary">Start Dijkstra</button>
    </div>
  );
}
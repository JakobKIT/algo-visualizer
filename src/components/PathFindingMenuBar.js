import React from 'react';

export default function PathFindingMenuBar({
  reset,
  selectStartNode,
  selectFinishNode,
  toggleWallDraw,
  isStartClicked,
  isFinishClicked,
  isDrawWall,
  startDijkstra
}) {
  const startCss = isStartClicked ? 'ml-2 btn btn-primary btn-active' : 'ml-2 btn btn-primary';
  const finishCss = isFinishClicked ? 'ml-2 btn btn-primary btn-active' : 'ml-2 btn btn-primary';
  const drawCss = isDrawWall ? 'ml-2 btn btn-primary btn-active' : 'ml-2 btn btn-primary';

  return (
    <div className="container">
      <div className="btn-group menu-bar" role="group">
        <button onClick={reset} type="button" className="ml-2 btn btn-primary">Reset</button>
        <button onClick={selectStartNode} type="button" className={`${startCss}`}>Select Start</button>
        <button onClick={selectFinishNode} type="button" className={`${finishCss}`}>Select End</button>
        <button onClick={toggleWallDraw} type="button" className={`${drawCss}`}>Draw Wall</button>
        <button onClick={startDijkstra} type="button" className="ml-2 btn btn-primary">Start Dijkstra</button>
      </div>
    </div>
  );
}
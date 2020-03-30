import React from 'react';

export default function PathFindingMenuBar({ selectStartNode, selectFinishNode, toggleWallDraw }) {
  return (
    <div className="btn-group menu-bar" role="group">
      <button onClick={selectStartNode} type="button" className="btn btn-secondary">Select Start</button>
      <button onClick={selectFinishNode} type="button" className="btn btn-secondary">Select End</button>
      <button onClick={toggleWallDraw} type="button" className="btn btn-secondary">Draw Wall</button>
    </div>
  );
}
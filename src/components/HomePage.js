import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function HomePage() {
  return (
    <div className="container">
      <h2>Home</h2>
      <Link to={routes.PATHFINDING}>Pathfinging Visualizer</Link>
    </div>
  );
}
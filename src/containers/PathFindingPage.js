import React, { Component } from 'react'
import { connect } from 'react-redux';
import PathFindingMenuBar from '../components/PathFindingMenuBar';
import Node from '../components/Node';
import { initializeGrid, setFinishAndStart, setWall } from '../utils/grid';
import { dijkstra, getShortestPathArray } from '../utils/dijkstra';

export class PathFindingPage extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      animate: false,
      isDrawWall: false,
      isMousePressed: false,
      isFinishClicked: false,
      isStartClicked: false,
      start: {
        row: 10,
        col: 10
      },
      finish: {
        row: 10,
        col: 40
      }
    };
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    const { start, finish } = this.state;
    let grid = initializeGrid();
    grid = setFinishAndStart(grid, start, finish);
    this.setState({grid});
  }

  selectStartNode(event) {
    const { animate } = this.state;
    if (animate) return;
    this.setState({
      isStartClicked: true,
      isFinishClicked: false,
      isDrawWall: false,
      isMousePressed: false,
    });
  }

  selectFinishNode(event) {
    const { animate } = this.state;
    if (animate) return;
    this.setState({
      isFinishClicked: true,
      isStartClicked: false,
      isDrawWall: false,
      isMousePressed: false,
    });
  }

  toggleWallDraw() {
    const { animate } = this.state;
    if (animate) return;
    this.setState({
      isDrawWall: true,
      isFinishClicked: false,
      isStartClicked: false,
      isMousePressed: false,
    });
  }

  handleMouseDown(col, row) {
    
    let { grid, isDrawWall } = this.state;

    if (!isDrawWall) return;

    grid = setWall(grid, row, col);
    this.setState({
      isMousePressed: true,
      grid
    });
  }

  handleMouseOver(col, row) {
    let { grid, isDrawWall, isMousePressed } = this.state;

    if (!isDrawWall || !isMousePressed) return;

    grid = setWall(grid, row, col);
    this.setState({
      grid
    });
  }

  onNodeClick(col, row) {
    let { grid, start, finish, isStartClicked, isFinishClicked, isDrawWall } = this.state;
    if (isDrawWall) {
      return;
    }

    let newGrid = grid;
    if (isStartClicked) {
      newGrid[start.row][start.col].isStart = false;
      start = {
        col,
        row
      };
    } else if (isFinishClicked) {
      newGrid[finish.row][finish.col].isFinish = false;
      finish = {
        col,
        row
      };
    } else {
      return;
    }
    newGrid = setFinishAndStart(newGrid, start, finish);
    this.setState({
      grid: newGrid,
      start,
      finish
    });
  }

  handleMouseUp() {
    this.setState({isMousePressed: false});
  }

  startDijkstra() {
    const { grid, start, finish } = this.state;
    const startNode = grid[start.row][start.col];
    const finishNode = grid[finish.row][finish.col];

    const visitedNodes = dijkstra(grid, startNode);
    const shortestPath = getShortestPathArray(finishNode);

    this.animate(visitedNodes, shortestPath);
  }

  animate(visited, path) {
    this.setState({
      isMousePressed: false,
      isFinishClicked: false,
      isStartClicked: false, 
      isDrawWall: false,
      animate: true,
    });

    for (let i = 0; i <= visited.length; i++) {
      if (i === visited.length) {
        setTimeout(() => {
          this.animatePath(path);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const current = visited[i];
        document.getElementById(`node-${current.row}-${current.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  animatePath(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const current = path[i];
        document.getElementById(`node-${current.row}-${current.col}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
    this.setState({ animate: false });
  }

  render() {
    const { grid, isDrawWall, isFinishClicked, isStartClicked } = this.state;
    return (
      <>
        <PathFindingMenuBar 
          reset={this.reset.bind(this)}
          selectStartNode={this.selectStartNode.bind(this)}
          selectFinishNode={this.selectFinishNode.bind(this)}
          toggleWallDraw={this.toggleWallDraw.bind(this)}
          isDrawWall={isDrawWall}
          isFinishClicked={isFinishClicked}
          isStartClicked={isStartClicked}
          startDijkstra={this.startDijkstra.bind(this)} />
        <div className="grid">
          {grid.map((node, index) => {
            return (
              <div className="row" key={index}>
                {node.map((field, fieldIndex) => {
                  const { row, col, isStart, isFinish, isWall } = field;
                  return (
                    <Node 
                      key={fieldIndex}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      onNodeClick={this.onNodeClick.bind(this)}
                      handleMouseDown={this.handleMouseDown.bind(this)}
                      handleMouseUp={this.handleMouseUp.bind(this)}
                      handleMouseOver={this.handleMouseOver.bind(this)}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  }
};

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PathFindingPage);

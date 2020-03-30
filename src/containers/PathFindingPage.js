import React, { Component } from 'react'
import { connect } from 'react-redux';
import PathFindingMenuBar from '../components/PathFindingMenuBar';
import Node from '../components/Node';
import { initializeGrid, setFinishAndStart, setWall } from '../utils/grid';

export class PathFindingPage extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
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
  };

  componentDidMount() {
    const { start, finish } = this.state;
    let grid = initializeGrid();
    grid = setFinishAndStart(grid, start, finish);
    this.setState({grid});
  };

  selectStartNode(event) {
    this.setState({
      isStartClicked: true,
      isFinishClicked: false,
      isDrawWall: false,
      isMousePressed: false,
    });
  };

  selectFinishNode(event) {
    this.setState({
      isFinishClicked: true,
      isStartClicked: false,
      isDrawWall: false,
      isMousePressed: false,
    });
  };

  toggleWallDraw() {
    this.setState({
      isDrawWall: true,
      isFinishClicked: false,
      isStartClicked: false,
      isMousePressed: false,
    });
  };

  handleMouseDown(col, row) {
    let { grid, isDrawWall } = this.state;

    if (!isDrawWall) return;

    grid = setWall(grid, row, col);
    this.setState({
      isMousePressed: true,
      grid
    });
  };

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
  };

  handleMouseUp() {
    this.setState({isMousePressed: false});
  };

  render() {
    const { grid, isDrawWall, isFinishClicked, isStartClicked } = this.state;
    return (
      <>
        <PathFindingMenuBar 
          selectStartNode={this.selectStartNode.bind(this)}
          selectFinishNode={this.selectFinishNode.bind(this)}
          toggleWallDraw={this.toggleWallDraw.bind(this)}
          isDrawWall={isDrawWall}
          isFinishClicked={isFinishClicked}
          isStartClicked={isStartClicked} />
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
  };
};

function mapStateToProps(state) {
  return {
    state
  };
};

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PathFindingPage);

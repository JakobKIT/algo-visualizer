import React, { Component } from 'react'
import { connect } from 'react-redux';
import PathFindingMenuBar from '../components/PathFindingMenuBar';
import Node from '../components/Node';
import { initializeGrid, setFinishAndStart } from '../utils/grid';

export class PathFindingPage extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
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
    });
  };

  selectFinishNode(event) {
    this.setState({
      isFinishClicked: true,
      isStartClicked: false,
    });
  };

  toggleWallDraw() {
    this.setState({
      isMousePressed: !this.state.isMousePressed
    });
  };

  onNodeClick(col, row) {
    let { start, finish, isStartClicked, isFinishClicked } = this.state;
    let newGrid = initializeGrid();
    if (isStartClicked) {
      start = {
        col,
        row
      };
    } else if (isFinishClicked) {
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

  render() {
    const { grid } = this.state;
    return (
      <>
        <PathFindingMenuBar 
          selectStartNode={this.selectStartNode.bind(this)}
          selectFinishNode={this.selectFinishNode.bind(this)}
          toggleWallDraw={this.toggleWallDraw.bind(this)} />
        <div className="grid">
          {grid.map((node, index) => {
            return (
              <div className="row" key={index}>
                {node.map((field, fieldIndex) => {
                  const { row, col, isStart, isFinish } = field;
                  return (
                    <Node 
                      key={fieldIndex}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      onNodeClick={this.onNodeClick.bind(this)}
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
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps, null)(PathFindingPage);

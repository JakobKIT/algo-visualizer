import React, { Component } from 'react'
import { connect } from 'react-redux';
import PathFindingMenuBar from '../components/PathFindingMenuBar';
import Node from '../components/Node';
import { initializeGrid } from '../utils/grid';

export class PathFindingPage extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      isWallDraw: false,
    };
  };

  componentDidMount() {
    const grid = initializeGrid();
    this.setState({grid});
  };

  selectStartNode(event) {
    console.log('start');
  };

  selectEndNode(event) {
    console.log('end');
  };

  toggleWallDraw() {
    this.setState({
      isWallDraw: !this.state.isWallDraw
    });
    console.log(this.state.isWallDraw);
  };

  render() {
    const { grid } = this.state;

    return (
      <>
        <PathFindingMenuBar 
          selectStartNode={this.selectStartNode.bind(this)}
          selectEndNode={this.selectEndNode.bind(this)}
          toggleWallDraw={this.toggleWallDraw.bind(this)} />
        <div className="grid">
          {grid.map((row, index) => {
            return (
              <div className="row" key={index}>
                {row.map((field, fieldIndex) => {
                  return (
                    <Node key={fieldIndex} field={field} />
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

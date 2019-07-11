import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {

    nrows: 6,
    ncols: 6,
    chanceLightStartsOn: 0.8

  }
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false

    }
    this.flipCellsAroundMe = this.flipCellsAroundMe.bind(this);
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    // let intBoard = new Array(this.props.nrows).fill(new Array(this.props.ncols));
    // let intBoard = Array(this.props.nrows).fill().map(() => Array(this.props.ncols).fill().map(() => undefined))
    let intBoard = [];
    // console.log(intBoard);

    //  console.log(intBoard[0][0]);
    for (let i = 0; i < this.props.nrows; i++) {
      intBoard[i] = Array(this.props.ncols);
      for (let j = 0; j < this.props.ncols; j++) {
        intBoard[i][j] = (Math.random() > this.props.chanceLightStartsOn) ? false: true;
     //   console.log(i + "---" + j + ":::" + intBoard[i][j]);
      }
    }
    // TODO: create array-of-arrays of true/false values
    return intBoard;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAroundMe(coord) {
    console.log(coord);
    console.log("flippping!!!!!");
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    this.setState(this.flipCell(y, x));

  }
  flipCell(y, x) {
    console.log("flip");
     console.log(y+"-------"+x);

    // if this coord is actually on board, flip it
    let currBoard = this.state.board;
    if ((x >= 0 && x < this.props.ncols) && (y >= 0 && y < this.props.nrows)) {
      console.log("before::::"+currBoard[y][x]);
      currBoard[y][x] = !currBoard[y][x];
     
    }
    // TODO: flip this cell and the cells around it

    if (x >= 0 && x < this.props.ncols && y >= 0 && y + 1 < this.props.nrows) {
      console.log("before::::"+currBoard[y][x]);
      currBoard[y + 1][x] = !currBoard[y + 1][x];
      console.log("after::::"+currBoard[y][x]);

    }
    if (x >= 0 && x < this.props.ncols && y - 1 >= 0 && y < this.props.nrows) {
      console.log("before::::"+currBoard[y][x]);
      currBoard[y - 1][x] = !currBoard[y - 1][x];
      console.log("after::::"+currBoard[y][x]);


    }
    if (x >= 0 && x + 1 < this.props.ncols && y - 1 >= 0 && y < this.props.nrows) {
      console.log("before::::"+currBoard[y][x]);
      currBoard[y][x + 1] = !currBoard[y][x + 1];
      console.log("after::::"+currBoard[y][x]);


    }
    if (x - 1 >= 0 && x < this.props.ncols && y - 1 >= 0 && y < this.props.nrows) {
      console.log("before::::"+currBoard[y][x]);
      currBoard[y][x - 1] = !currBoard[y][x - 1];
      console.log("after::::"+currBoard[y][x]);

    }

    let upddateWon = (() => {
      for (let i = 0; i < this.props.ncols; i++) {
        for (let j = 0; j < this.props.nrows; j++) {
          if (!this.state.board[i][j])
            return false;
        }
      }
      return true;
    });
    // win when every cell is turned off
    // TODO: determine is the game has been won
    return { currBoard, upddateWon };
  }



  /** Render game board or winning message. */

  render() {
    
    let renderBoard = () => {
      console.log("renderiing");
      let board=this.state.board;
      let cells = [];
      for (let i = 0; i < this.props.ncols; i++) {
        for (let j = 0; j < this.props.nrows; j++) {
          board[i][j] === true ?
            cells.push(<Cell isLit={true} coord={i + "-" + j} flipCellsAroundMe={this.flipCellsAroundMe} />) :
            cells.push(<Cell isLit={false} coord={i + "-" + j} flipCellsAroundMe={this.flipCellsAroundMe} />);

        }
        cells.push(<br></br>);
      }
      return cells;
    };

    return (
      <div>{renderBoard()}</div>


    );
  }
}


export default Board;

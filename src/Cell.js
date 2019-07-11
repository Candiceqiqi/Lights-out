import React, {Component} from 'react'
import "./Cell.css"


/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    console.log("triggerring!!!!!");
    // call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe(this.props.coord);
  }

  render() {
    let classes = "Cell" + (this.props.isLit? "-lit" : "-No");
  //  console.log("isLit ::::"+this.props.isLit+"  the coord is"+this.props.coord);
    return (
        <button className={classes} onClick={this.handleClick} />
    )
  }
}


export default Cell
import * as React from 'react';
import './Dot.css';

const distanceX = 10;
const distanceY = 20;
const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

const _distanceX = -distanceX;
const _distanceY = -distanceY;
const _distance = -distance;

interface DotI {
  x: number;
  y: number;
  color: string;
  index: number;
  time: number;
  direction?: number;
}

interface PropTypes {
  dot: DotI;
}

interface StateTypes {
  direction: Array<Direction>;
  tx: number;
  ty: number;
  color: string;
}

interface Direction {
  dx: number;
  dy: number;
}

class Dot extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      direction: [
        {
          dx: 0,
          dy: _distance,
        }, {
          dx: distanceX,
          dy: _distanceY,
        }, {
          dx: distanceY,
          dy: _distanceX,
        }, {
          dx: distance,
          dy: 0,
        }, {
          dx: distanceY,
          dy: distanceX,
        }, {
          dx: distanceX,
          dy: distanceY,
        }, {
          dx: 0,
          dy: distance,
        }, {
          dx: _distanceX,
          dy: distanceY,
        }, {
          dx: _distanceY,
          dy: distanceX,
        }, {
          dx: _distance,
          dy: 0,
        }, {
          dx: _distanceY,
          dy: _distanceX,
        }, {
          dx: _distanceX,
          dy: _distanceY
        }
      ],
      tx: this.props.dot.x,
      ty: this.props.dot.y,
      color: this.props.dot.color,
    };
  }

  componentDidMount() {
    const d = this.props.dot.direction;
    if (d === undefined) { return; }
    const { dx, dy } = this.state.direction[d];

    setInterval(
      () => {
        let { tx, ty } = this.state;
        tx += dx;
        ty += dy;

        this.setState({
          tx,
          ty,
        });
      },
      20
    );
  }

  render() {
    return (
      <div
        className="dot"
        style={{ transform: 'translate3d(' + this.state.tx + 'px, ' + this.state.ty + 'px, 0)', backgroundColor: this.state.color }}
      />
    );
  }
}

export default Dot;

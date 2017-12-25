import * as React from 'react';
import { Observable } from 'rxjs';
import './App.css';
import Dot from '../Dot/Dot';

interface DotI {
  x: number;
  y: number;
  color: string;
  index: number;
  time: number;
  direction?: number;
}

interface StateType {
  color: number;
  dots: Array<DotI>;
  index: number;
}

class App extends React.Component<Object, StateType> {
  constructor(props: Object) {
    super(props);
    this.state = {
      color: Math.floor(Math.random() * 16777215),
      dots: [],
      index: 0,
    };
  }

  changeColor(color: number, step: number = 100) {
    if (color >= 16777215 - step) {
      return 0;
    }
    return color + step;
  }
  
  formatColor(color: number) {
    let _color = color.toString(16);
    if (_color.length < 6) {
      const padString = new Array(6 - _color.length).fill(0).join('');
      _color = `${padString}${_color}`;
    }

    return `#${_color}`;
  }

  componentDidMount() {
    const app = document.getElementById('App') as HTMLElement;

    const $up = Observable.interval(10).mapTo('up');
    const $down = Observable.interval(10).mapTo('down');

    const $mouseup = Observable.fromEvent(app, 'mouseup').mapTo($up);
    const $mousedown = Observable.fromEvent(app, 'mousedown').mapTo($down);

    const $click = Observable.merge($mousedown, $mouseup)
      .startWith($up)
      .switchMap(val => val);

    const $mousemove = Observable.fromEvent(app, 'mousemove');
    Observable.combineLatest($mousemove, $click)
      .throttleTime(10)
      .subscribe(([e, click]: [MouseEvent, string]) => {
        const now = +new Date();
        const dots = this.state.dots.filter((d: DotI) => now - d.time <= 5000);
        let index = this.state.index;
        const colorNumber = this.changeColor(this.state.color);
        const color = this.formatColor(colorNumber);
        
        if (click === 'down') {
          const downDots = Array.from({ length: 12 }).map((v, i) => ({
            x: e.clientX,
            y: e.clientY,
            color,
            time: +new Date(),
            direction: i,
            index: index++,
          }));
          Array.prototype.push.apply(dots, downDots);
        } else {
          dots.push({
            x: e.clientX,
            y: e.clientY,
            color,
            index: index++,
            time: +new Date()
          });
        }
        this.setState({
          dots,
          index,
          color: colorNumber,
        });
      });
  }

  render() {
    const renderDots = [];
    for (let dot of this.state.dots) {
      renderDots.push(<Dot dot={dot} key={dot.index} />);
    }
    return (
      <div className="App" id="App">
        {renderDots}
      </div>
    );
  }
}

export default App;

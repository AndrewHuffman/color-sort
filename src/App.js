import React, {Component} from 'react';
import {range, clone} from 'lodash';
import logo from './logo.svg';
import './App.css';

function hueToHsl(hue) {
  return 'hsl(' + hue + ', 100%, 50%)';
}

function toRandom(list) {
  return list.sort(() => 0.5 - Math.random()).map(hue => {
    return hue;
  });
}

function doQuickSortStep(list) {
  const pivot = list[0];
  let left = list.filter(n => n > pivot);
  let right = list.filter(n => n <= pivot);
  return {left, right};
}

function stepQuickSort(list) {
  let {left, right} = doQuickSortStep(list);

  return function step() {
    let lStep = doQuickSortStep(left);
    let rStep = doQuickSortStep(right);
    left  = lStep.left.concat(lStep.right);
    right = rStep.left.concat(rStep.right);
    return left.concat(right);
  }
}

class App extends Component {
  constructor() {
    super();
    this.hues = toRandom(range(0, 360));
    this.stepper = stepQuickSort(this.hues);
  }

  get slices() {
    return this.hues.map(hue => hueToHsl(hue));
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  componentDidMount() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this
      .canvas
      .getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.sliceWidth = this.width / this.slices.length;

    this.updateCanvas();
  }

  drawSlice(hue, idx) {
    this.ctx.fillStyle = hueToHsl(hue);
    this
      .ctx
      .fillRect(idx * this.sliceWidth, 0, this.sliceWidth, this.height);
    this
      .ctx
      .fill();
  }

  drawSlices() {
    this
      .hues
      .forEach(this.drawSlice.bind(this));
  }

  clear() {
    this
      .ctx
      .clearRect(0, 0, this.width, this.height);
  }

  animateSort() {
    let steps = 10;
    let interval = setInterval(() => {
      console.log('?')
      this.clear();
      this.hues = this.stepper();
      this.stepper = stepQuickSort(this.hues);
      this.drawSlices();
      if (--steps < 0) {
        clearInterval(interval);
      }
    }, 500);
  }

  updateCanvas() {
    this.drawSlices();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <canvas height="500" width="500"></canvas>
        </p>
        <button onClick={this
          .animateSort
          .bind(this)}>Sort</button>
      </div>
    );
  }
}

export default App;

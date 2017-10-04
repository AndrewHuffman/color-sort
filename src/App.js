import React, {Component} from 'react';
// import colors from 'html-colors';
import {range, clone} from 'lodash';
// import convert from 'color-convert';
import logo from './logo.svg';
import './App.css';

const hues = range(0, 360);
const slices = hues.length;

class App extends Component {
  sortColors() {
    const sortedColors = hues.map(hue => {
      return 'hsl(' + hue + ', 100%, 50%)';
    });
    this.ctx.clearRect(0,0,500,500);
    sortedColors.forEach((color, idx) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(idx * this.sliceWidth, 0, this.sliceWidth, this.height);
      this.ctx.fill();
    });
  }

  componentDidUpdate() {
    this.updateCanvas();
  }
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.sliceWidth = this.width / slices;

    const randomColors = clone(hues).sort(() => 0.5 - Math.random()).map(hue => {
      return 'hsl(' + hue + ', 100%, 50%)';
    });

    randomColors.forEach((color, idx) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(idx * this.sliceWidth, 0, this.sliceWidth, this.height);
      this.ctx.fill();
    });
    setTimeout(() => this.sortColors(), 1000);
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
      </div>
    );
  }
}

export default App;

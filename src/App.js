import React, {Component} from 'react';
import {range, clone} from 'lodash';
import logo from './logo.svg';
import './App.css';

const hues = range(0, 360);
const slices = hues.length;

class App extends Component {
  sortColors() {
    const sortedColors = hues.map(hue => {
      return 'hsl(' + hue + ', 100%, 50%)';
    });
    this.clear();
    sortedColors.forEach(this.drawSlice.bind(this));
  }

  componentDidUpdate() {
    this.updateCanvas();
  }
  componentDidMount() {
    this.updateCanvas();
  }
  drawSlice(color, idx) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(idx * this.sliceWidth, 0, this.sliceWidth, this.height);
    this.ctx.fill();
  }
  clear() {
    this.ctx.clearRect(0,0,this.width, this.height);
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

    randomColors.forEach(this.drawSlice.bind(this));
    
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

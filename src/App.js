import React, {Component} from 'react';
import colors from 'html-colors';
import {values, range} from 'lodash';
import convert from 'color-convert';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidUpdate() {
    this.updateCanvas();
  }
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    const hues = range(0, 360);
    const slices = hues.length;
    const {width, height} = canvas;
    const sliceWidth = width / slices;
    const sortedColors = hues.map(hue => {
      return 'hsl(' + hue + ', 100%, 50%)';
    });
    const randomColors = hues.sort(() => 0.5 - Math.random()).map(hue => {
      return 'hsl(' + hue + ', 100%, 50%)';
    });
    console.log(sortedColors);

    randomColors.forEach((color, idx) => {
      console.log('color->', color)
      ctx.fillStyle = color;
      ctx.fillRect(idx * sliceWidth, 0, sliceWidth, height);
      ctx.fill();
    });
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

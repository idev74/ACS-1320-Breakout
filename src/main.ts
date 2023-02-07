import Game from './Game';

const canvas = <HTMLCanvasElement> document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const game = new Game(canvas, ctx);
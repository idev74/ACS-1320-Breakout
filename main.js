import Game from './main.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const game = new Game(canvas, ctx);
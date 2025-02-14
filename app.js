import Hyperswarm from 'hyperswarm';
import crypto from 'crypto';
import b4a from 'b4a';

/** @typedef {import('pear-interface')} */ /* global Pear */

// Initialize Pear runtime
const pear = new Pear();

const swarm = new Hyperswarm();

// Set up event listener for the title
document.querySelector('h1').addEventListener('click', (e) => {
    e.target.innerHTML = '🍐';
});

// Function to initialize the game
function initGame() {
    // Game initialization logic here
    console.log('Game initialized');
}

// Function to handle peer connections
function handlePeerConnections() {
    pear.on('connection', (peer) => {
        console.log('Connected to peer:', peer.id);
        // Handle peer communication here
    });
}

// Start the game and handle peer connections
initGame();
handlePeerConnections();

//Game constants
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const PADDLE_SPEED = 15;
const BALL_SPEED = 3;

class PongGame {
    constructor(canvas, playerid) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.playerid = playerid;
        this.players = new Map();
        this.ball = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            dx: BALL_SPEED,
            dy: BALL_SPEED }
        this.scores = {};
        this.isHost = false;
        };
        this.paddle = {
            x: 0,
            y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
            dy: 0,
        };
        this.opponentPaddle = {
            x: CANVAS_WIDTH - PADDLE_WIDTH,
            y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        };
        this.score = 0;
    }
}
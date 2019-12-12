
enum Action {DOWN=0, LEFT=1, RIGHT=2, ROTATE=3}; 
enum RotationState {_0=0, _90=1, _180=2, _270=3}; 

class Tetromino {

    //currentBoardRow and currentBoardCol determine tetromino top-left corner position. 
    private currentBoardRow: number; // Starting row for tetromino.
    private currentBoardCol: number; // Starting column for tetromino.
    private rotation:RotationState; //0-4
    
    //check Collisions with boardEdges
    //check collisions with board Items


}
class ActiveTetromino extends Tetromino {
  //toBoard
  //removeFromBoard
  //addKeyboardListeners
  //removeKeyboardListeners
  //move
}

/**
 * Creates logical game board - a 2D array od numbers that stores values corresponding tetromino colors.
 * Keeps game state (isPlaying) and score.
 * Creates game-loop.
 * @listens frontReady 
 * @fires drawGameBoard 
 * @fires updateGameBoard 
 */
class Game {

    private gameBoard: number[][];
    private score: number = 0; // Tracks the score
    private isPlaying: boolean = true;
    /**
     * @param rows number of rows in logical game board
     * @param cols number of columns in logical game board
     * @listens frontReady - all logic starts after frontReady
     */
    constructor(private rows: number = 20, private cols: number = 12) {
        document.addEventListener('frontReady', this.createGameBoard)
    }
    /**
     * Creates logical game board [row x cols] and fills it with 0-s.
     * @fires drawGameBoard - should draw visual game board on the screen
     * @fires updateGameBoard - should re-draw visual game board to match logical game board
     */
    createGameBoard = () => {
        //Creates 2D array pre-filled with 0-s.
        this.gameBoard = Array(this.rows).fill(0).map(() => Array(this.cols).fill(0));
        document.dispatchEvent(new CustomEvent('drawGameBoard', { detail: this.gameBoard }));
        this.gameBoard[1][4] = 4;
        this.gameBoard[0][6] = 6;
        document.dispatchEvent(new CustomEvent('updateGameBoard', { detail: this.gameBoard }));

    }
}
let g = new Game();


/* NOTES:

import {EventEmitter} from 'events';
class test extends EventEmitter {
    constructor() { super(); this.emit('ready');}
}
new test();

class Coordinates{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
*/


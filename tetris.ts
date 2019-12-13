class gameBoardHelpers{
 //static methods to manage gameBoard

}
/**
 * Creates logical game board - a 2D array od numbers that stores values corresponding tetromino colors.
 * Keeps game state (isPlaying) and score.
 * Creates game-loop.
 * @listens frontReady 
 * @fires drawGameBoard 
 * @fires updateGameBoard
 * Is a Singleton. Creates instance of itself on setup.
 */
 
class Game {

    //code block needed to to implement singleton 
    //alternatives to singleton: https://basarat.gitbooks.io/typescript/docs/tips/singleton.html
    private static instance:Game = new Game();
    //need to be called in a constructor
    private singletonCheck(){
        if(Game.instance){
            throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
        }
        Game.instance = this;
    }
    public static getInstance():Game
    {
        return Game.instance;
    }
    //end of singleton code block

    //should be a private property with getter and setter
    public gameBoard: number[][];
    private score: number = 0; // Tracks the score
    private isPlaying: boolean = true;
    /**
     * @param rows number of rows in logical game board
     * @param cols number of columns in logical game board
     * @listens frontReady - all logic starts after frontReady
     */
    constructor(private rows: number = 20, private cols: number = 12) {
        document.addEventListener('frontReady', this.createGameBoard);
        this.singletonCheck();
    }
    /**
     * Creates logical game board [row x cols] and fills it with 0-s.
     * @fires drawGameBoard - should draw visual game board on the screen
     * @fires updateGameBoard - should re-draw visual game board to match logical game board
     */
    createGameBoard = ():void => {
        //Creates 2D array pre-filled with 0-s.
        this.gameBoard = Array(this.rows).fill(0).map(() => Array(this.cols).fill(0));
        document.dispatchEvent(new CustomEvent('drawGameBoard', { detail: this.gameBoard }));
        this.gameBoard[1][4] = 4;
        this.gameBoard[0][6] = 6;
        document.dispatchEvent(new CustomEvent('updateGameBoard', { detail: this.gameBoard }));
        let t:Tetromino = new Tetromino();
        t.addToBoard();
        
    }
    startLevel():void{

        //create tetromino
        //attach behaviors to tetromino
    }
    stopLevel():void{
        //

    }
}
//let g = new Game();


enum Action { DOWN = 0, LEFT = 1, RIGHT = 2, ROTATE = 3 };
enum RotationState { _0 = 0, _90 = 1, _180 = 2, _270 = 3 };



class Tetromino {
    /**
     * YAll pieces laid out on a 4x4 grid,
     *  where each cell is either occupied or not - 1 or 0 
     * Each tetromino and its rotations can be represented as 16 bit integer 
     * @see https://codeincomplete.com/posts/javascript-tetris/
     * Color of a tetromino corresponds to its row number in shapes array.
     * Converting between hex and binary is actually not needed, everything could be implemented in decimal to make it easier.
     */
    private board = Game.getInstance().gameBoard;
    private shapes:number[][]=[
        [0x0F00, 0x2222, 0x00F0, 0x4444], 
        [0x44C0, 0x8E00, 0x6440, 0x0E20],
        [0x4460, 0x0E80, 0xC440, 0x2E00],
        [0xCC00, 0xCC00, 0xCC00, 0xCC00],
        [0x06C0, 0x8C40, 0x6C00, 0x4620],
        [0x0E40, 0x4C40, 0x4E00, 0x4640],
        [0x0C60, 0x4C80, 0xC600, 0x2640],
    ];
    currentShape:number = 0;
    rotation: RotationState = RotationState._0; 

    //currentBoardRow and currentBoardCol determine tetromino top-left corner position. 
    constructor(
        private currentBoardRow: number=0, 
        private currentBoardCol: number=4){

    }
    //value 0 removes from board else adds to board
    private valueToBoard(value:number):void{
        this.forEachTetrominoBlock(( row:number, col:number):void => {
            this.board[row][col] = value;
          });
          document.dispatchEvent(new CustomEvent('updateGameBoard', { detail: this.board }));
    }
    addToBoard():void{
        // maps shape to int values used in a gameBoard to determine shape colors
        //do determine shape colors shape position in shape array mapped to sprite animation frames
        //But animation frame  0 is empty space, therefore to get actual colors we need to add 1. 
        this.valueToBoard(this.currentShape +1);
    }
    removeFromBoard():void{
        this.valueToBoard(0);
    }
    clashesWithItemsOnBoard():boolean{
        let clashes = false;
        this.forEachTetrominoBlock(( row:number, col:number):void => {
            if (this.board[row][col] !=0){
                clashes =  true;
            } 
          });
        return clashes;
    }
    fitsInsideBoard():boolean{
        let fits = true;
        try{
            this.forEachTetrominoBlock(( row:number, col:number):void => {
                this.board[row][col];
              });
        } catch (error) {
            fits = false;    
        }       
        return fits;
    }

    forEachTetrominoBlock(callback:(row?:number, col?:number, value?:number)=>any) {
        let binaryNum:number;
        let row:number = 0;
        let col:number = 0; 
        let tetrominoData = this.shapes[this.currentShape][this.rotation];
        //checks every position in binary version of  integer 0x.....
        //from left to right, keeps track of logical row and column numbers
        //from 0x8000 -  binary 1000000000000000 to 1
        //do the right bit-shift instead of increment in a for loop
        for(binaryNum = 0x8000 ; binaryNum > 0 ; binaryNum = binaryNum >> 1) {
          if (tetrominoData & binaryNum) { 
            //if there is tetromino at this position return col and row + start x start y
            //this will math coordinates of the grid
            console.log(row+this.currentBoardRow, col+this.currentBoardCol);
            callback(row+this.currentBoardRow, col+this.currentBoardCol, );
        
          if (++col === 4) {
            col = 0;
            ++row;
          }
        }
      };
    }
    

  //removeFromBoard
  //check Collisions with boardEdges
  //check collisions with board Items


}
class ActiveTetromino extends Tetromino {
    
   
    //addKeyboardListeners
    //removeKeyboardListeners
    //move
}
// example of a behavior - can be attached to any object
class everyXMiliSeconds {
    private timeAccumulator: number = 0;
    private lastTime: number = 0;
    private frameID: number;


    constructor(
        private dropInterval: number = 1000, 
        private callback?: () => void
        ) {
    }

    step = (timestamp = 0):void => {
        const deltaTime = timestamp - this.lastTime;
        this.timeAccumulator += deltaTime;
        this.lastTime = timestamp;
        if (this.timeAccumulator > this.dropInterval) {
            //move tetromino
            this.callback();
            this.timeAccumulator = 0;
            console.log(this.timeAccumulator);
        }
        //perform calculations
        this.frameID = requestAnimationFrame(this.step);
        //cancelAnimationFrame(fId)
    }

    stop() {
        cancelAnimationFrame(this.frameID);
    }
}


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


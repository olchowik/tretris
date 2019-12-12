import * as PIXI from 'pixi.js';
//https://jvilk.com/MakeTypes/

//right panel at 500

/**
 * Draws 2D array of animated sprites on the screen 
 * @listens drawGameBoard
 * on drawGameBoard 2D array of animated sprites is created and displayed
 * @listens updateGameBoard
 * on updateGameBoard sprites change animation 
 * @todo with little tweeks can be used to draw "incoming" tetrominos board
 */
class VisualBoard {

    private board: PIXI.AnimatedSprite[][] = new Array();

    /**
     * @param stage PIXI application stage sprites will be aded to.
     * @param blockTextureArray Textures to use with sprites
     * @param blockSize side of a square on a game board
     * @param paddingLeft left offset used to draw top-left corner of the board
     * @param paddingTop top offset used to draw top-left corner of the board
     * @listens drawGameBoard
     * @listens updateGameBoard
     * @todo figure out what is correct type for PIXI.application.stage
     */
    constructor(
        private stage: any,
        private blockTextureArray: PIXI.Texture[],
        private blockSize: number = 42,
        private paddingLeft: number = 10,
        private paddingTop: number = 10
    ) {
        document.addEventListener('drawGameBoard', this.createBoard);
        document.addEventListener('updateGameBoard', this.updateBoard)
    }
    /**
     * For each value in the 2D gameBoard array creates a sprite
     * Sets sprite animation frame to this value.
     * Adds sprite to the stage. 
     * Value's row, col positions in gameBoard array determin the position of the sprite on the stage e.g.
     * sprite1: row=0, col=0: -> Sprite1 position  determined by paddingLeft and paddingTop.
     * sprite2: row=1, col=0: -> sprite2 is below sprite1 - movedd a blockSize down from sprite1.
     */
    createBoard = (event) => {
        const gameBoard = event.detail
        for (let row = 0; row < gameBoard.length; row++) {
            //appends new row to a boad array
            this.board.push(new Array())
            for (let col = 0; col < gameBoard[row].length; col++) {
                //saves AnimatedSprite to board array
                this.board[row][col] = this.createBlock(gameBoard[row][col], row, col);
            }
        }
    }
    /**
     * Creates animated sprite with 8 possible animation frames from this.blockTextureArray.
     * First animation frame shows empty space (black block).
     * Subsequent 7 frames frames correspond to tetromino colors.
     * Sets sprite's animation frame to value from gameBoard array (currently allways 0).
     * places sprite on the stage based on blocks row and column numbers in gameBoard array.
     * @param value sprite's current animation frame
     * @param row  sprite's row in a gameboard
     * @param col  sprite's column in a gameboard
     * @returns instance of AnimatedSprite with 8 animation frames
     */
    private createBlock = (value: number, row: number, col: number): PIXI.AnimatedSprite => {

        let animatedSprite = new PIXI.AnimatedSprite(this.blockTextureArray);
        animatedSprite.gotoAndStop(value);
        animatedSprite.x = this.paddingLeft + this.blockSize * col;
        animatedSprite.y = this.paddingTop + this.blockSize * row;
        this.stage.addChild(animatedSprite);
        return animatedSprite;
    }
    /**
     * For every sprite in this.board the animation frame is set to corresponding value from gameBoard array passed as event payload.
     * @toDo room for optiisation a) redraw rectangular part of the board b) compare and search for actual changes.
     * @todo figure out custom events type event:{detil:number[][]} does not compile.
     * @see:https://stackoverflow.com/questions/47166369/argument-of-type-e-customevent-void-is-not-assignable-to-parameter-of-ty?rq=1
     */
    updateBoard = (event) => {

        let gameBoard = event.detail
        for (let row = 0; row < gameBoard.length; row++) {
            for (let col = 0; col < gameBoard[row].length; col++) {
                this.board[row][col].gotoAndStop(gameBoard[row][col]);
            }
        }
    }
    /**
     * Removes listeners - not doing that would cause memory leak.
     * @todo remove board from screen - need layers to do it properly.
     */
    removeBoard = () => {

        document.removeEventListener('drawGameBoard', this.createBoard);
        document.removeEventListener('updateGameBoard', this.updateBoard)
    }

}

/**
 * Creates application, loads textures, manages resizing
 * @fires frontReady
 */
class GameRenderer {
    private app: PIXI.Application;
    private mainBoard: VisualBoard;
    private targetWidth: number = 620; //logical width of pixi app
    private targeHeight: number = 860;  //logical height of pixi app
    private blockImages: string[] = [
        "assets/bg_block.png",
        "assets/block_green.png",
        "assets/block_orange.png",
        "assets/block_violet.png",
        "assets/block_light_blue.png",
        "assets/block_blue.png",
        "assets/block_red.png",
        "assets/block_pink.png",
    ];

    /**
     * Scale  app  so that: 
     * + app height allways fits to inside window and 
     * + app is is proportionally resised
     * @see https://www.html5gamedevs.com/topic/26741-right-way-to-manage-stage-size-for-web-and-mobile/ 
     */
    scaleToWindowHeight = () => {
        let ratio = (window.innerHeight - 20) / this.targeHeight
        this.app.renderer.resize(this.targetWidth * ratio, this.targeHeight * ratio);
        this.app.stage.scale.x = this.app.stage.scale.y = ratio;
        document.body.appendChild(this.app.view);
    }
    /**
     * + creates app 
     * + ensures that app is resized on every resize event
     * + creates an array of textures from array of file paths,textures will be used to draw board and tetrominos
     * + creates main game board (mainBoard) that will be displayed on the screen
     * @fires frontReady
     * @listens resize
     * @todo make supe images are preloaded befor fireing  frontReady event
     */
    startPixi = () => {

        this.app = new PIXI.Application();
        this.scaleToWindowHeight();
        window.addEventListener("resize", this.scaleToWindowHeight);
        //maps array of file paths to array of textures
        let blockTextureArray: PIXI.Texture[] = this.blockImages.map(e => PIXI.Texture.from(e));
        // creates VisualBoard that will listen to events from logic module
        this.mainBoard = new VisualBoard(this.app.stage, blockTextureArray, 42, 10, 10)
        // notifies logic module
        document.dispatchEvent(new Event('frontReady'));
    }

}

let g = new GameRenderer();
document.addEventListener("DOMContentLoaded", g.startPixi);


/* NOTES:

	var circle = new PIXI.Graphics();
	 circle.beginFill(0x5cafe2);
	 circle.drawCircle(0, 0, 80);
	 circle.x = 320;
	 circle.y = 180;
	 app.stage.addChild(circle);
     center the sprites anchor point
	 animatedSprite.anchor.set(0.5); app.screen.width
*/


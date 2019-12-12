html5 game engines https://html5gameengine.com/

ROADMAP:
+ project setup with TypeScript, webpack and PIXI
+ frontend that draws and update game board
+ basic app scaling
+ communication between frontend and backend via events

- game-loop 
- logic behind tetrominos -shapes, -movements -rotations 
- removal of full rows?
- replay 


##  0. USAGE:
npm install
npm start

##  1 DESIGN
Game logic is separated from frontend(rendering).

They communicate via events.
Currently for convenience browser custom events https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent.
Should probably be changed to  https://www.npmjs.com/package/events or custom pub-sub implementation.


Events are emitted FROM logic to frontend. Only 'frontReady' event is emitted from frontend.

logic <---frontReady------ frontend

logic ---drawGameBoard---> frontend

logic --updateGameBoard--> frontend


logic listens to keyboard events.

PIXI.js is used ONLY on the frontend.
Logic and frontend are supposed to be two separate .js files after bundling with webpack.
Game loop  is inside logic - therefore I am not using PIXI ticker.

Game loop is based: 
+ on RequestAnimationFrame
+ takes into account elapsed time (does not assume 60FPS)
+ cancels AnimationFrame (avoid memory leak)
Reasons why game loop is not based on setInterval:
better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b

##  2 Docs 
Try to follow JSDocs.

##  3 Arrow functions as methods and other strange things.
All function within classes are arrow functions to avoid "binding this" when functions are used as a callbacks for events.
Some do not need to be arrow functions.
If you come across any other weird code there is likely a underlying reason. The main one is implementation speed.

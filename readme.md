html5 game engines https://html5gameengine.com/

ROADMAP:
+ project setup with TypeScript, webpack and PIXI
+ frontend that drows and update game board
+ basic app scaling
+ communication between frontend and backend via events
- game-loop 
- logic behind tetrominos -shapes, -movements -rotations 
- removal of full rows?
- replay 


0. USAGE:
npm install
npm start

1. DESIGN
Game logic is seperated from frontend(rendering).

They communicate via events.
Currently for convinience browser custom events https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent.
Should probably be changed to  https://www.npmjs.com/package/events or custom pub-sub implementation.


Events are emmitetd FROM logic to frontend. Only 'frontReady' event is emmited from frontend.

logic <---frontReady------ frontend
logic ---drawGameBoard---> frontend
logic --updateGameBoard--> frontend

logic listens to keyboard events.

PIXI.js is used ONLY on the frontend.
Logic and frontend are suppouse to be two seperate .js files after boundling with webpack.
Game loop  is inside logic - therefore I am not using PIXI ticker.

Game loop is based: 
+ on RequestAnimationFrame
+ takes into account elapsed time (does not assume 60FPS)
+ canclesAnimationFrame (avoid memory leak)
Reasons why game loop is not based on setInteval:
better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b

3. Docs - try to follow JSDocs.

4. Arrow functions as methods and other strange things.
All function within classes are arrow functions to avoid "binding this" when functions are used as a callbacks for events.
Some do not need to be arrow functions.
If you come across any other werid code there is likely a underlying reason. The main one is implementation speed.

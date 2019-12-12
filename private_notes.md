to setup webpack:
https://appdividend.com/2018/03/18/how-to-setup-typescript-with-webpack-4/#Setup_TypeScript_with_Webpack_4
multiple outputs with webpack:
https://wanago.io/2018/07/16/webpack-4-course-part-one-entry-output-and-es6-modules/
Getting started with webpack and ES6 modules
https://medium.com/@svinkle/getting-started-with-webpack-and-es6-modules-c465d053d988

to run cd project without webpack
1.to folder
2. (install if not present)
npm install -g http-server
3. http-server -c-1

compile .tj: tsc fileName
run without browser: node tsc



About javascript: https://2ality.com/index.html
tetris tutorial: hexadecimal notation - https://codeincomplete.com/posts/javascript-tetris/
Publisher/Subscriber: https://medium.com/@thebabscraig/javascript-design-patterns-part-2-the-publisher-subscriber-pattern-8fe07e157213
bind event handlers in Class Components: https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/

http://127.0.0.1:8080/

- html5 game engines https://html5gameengine.com/
- setup

- game loop

- block Class
 - translate
 - move (R, L, D, Rotate(up))
 - add ->redraw
 - remove
 - Colision
   (board + blocks)
 - leave (free listeners+animate) - redraw + emitBoardEvent

//singleton
- usedBlocks Class //singleton
 - deleteFilledRows - redraw
 - hasLost

- board Class 
  static  toScreenPosition


Model tetris:
https://tetris.com/play-tetris

Custom events:
Seperation between View and Controller
https://javascript.info/dispatch-events

tetris tuts:
-> 
*https://www.youtube.com/watch?v=QDp8BZbwOqk
http://www.newthinktank.com/2019/06/tetris-game-design/
http://www.newthinktank.com/wordpress/tetris/Tetris.html
-> alternative:
https://www.youtube.com/watch?v=H2aW5V46khA

pixi tuts:
6 tuts: https://www.youtube.com/watch?v=EDEUsXqPTI0
nice code tuts:
https://www.youtube.com/watch?v=gc0mSaW_DDI

game loop + keyboard tuts:
https://github.com/kittykatattack/learningPixi#usingaliases
ticker
https://medium.com/swlh/inside-pixijss-high-performance-update-loop-856fb1d841a0
different versions of game loop: https://github.com/pixijs/pixi.js/wiki/v5-Custom-Application-GameLoop


requestAnimationFrame + cancelAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
proper cancelation of animationFrame
https://medium.com/javascript-in-plain-english/better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b
let timer = null;

see HTML living standard: https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-animationframeprovider-requestanimationframe
The more you create requestAnimationFrame, the more handlers will be in the list. And you MUST get rid of it from the list every time after the callback function is invoked.

function loop(number) {
  console.log(number);
  
  if (number > 9) {
    return;
  }
  
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(() => loop(number + 1));
}

loop(1);
matrix multiplication:
https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
https://www.robinwieruch.de/linear-algebra-matrix-javascript
https://mathjs.org/docs/getting_started.html
https://en.wikipedia.org/wiki/Rotation_matrix
npm install math.js


//es6 module exports https://kursjs.pl/kurs/es6/moduly.php
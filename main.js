import { Player } from './player.js';
import { Money } from './money.js';

let progress = {
    score: 0,
    energy: 1000
}

function saveProgress() {
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    console.log('Progress saved');
}

function loadProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
        progress = JSON.parse(savedProgress);
        console.log('Progress loaded', progress);
    } else {
        console.log('No saved progress found');
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let animate;
const ANIMATION_DELAY = 30;

window.addEventListener('load', function() {
    loadProgress();
    
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;

    const canvas2 = document.getElementById("canvas2");
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = canvas.width;
    canvas2.height = canvas.offsetTop - canvas.height/2 - 5;

    const userTap = document.getElementById("userTap");
    userTap.width = canvas.width;
    userTap.height = canvas.height;


    class Game {
        constructor() {
            this.player = new Player(canvas);
            this.money = new Money(canvas2);
        }
        update() {
            this.player.update();
            this.money.update();
        }
        draw() {
            this.money.draw(ctx2, progress.score);
            this.player.draw(ctx);
        }
    }

    const game = new Game();
    console.log(game);
    game.draw();

    animate = async function() {
        for (let i = 0; i < 2; i++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            game.update();
            game.draw();
        
            await delay(ANIMATION_DELAY);
        }
        await delay(ANIMATION_DELAY - 10);
        for (let i = 0; i < 2; i++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            game.update();
            game.update();
            game.draw();
        
            await delay(ANIMATION_DELAY);
        }
        
    }
    
   

});

window.buttonClicked = function buttonClicked() {
    progress.score++;
    progress.energy--;
    saveProgress();
    console.log('tap');
    animate();
}


setInterval(() => {
    progress.energy++;
}, 1000);
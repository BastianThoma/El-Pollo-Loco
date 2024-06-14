let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My Char is..', world.character)
}

window.addEventListener("keypress", (e)=>{
    console.log(e);
});
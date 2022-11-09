import theGame from './Game';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
    theGame.start();
}

const addSaucerButton = document.getElementById("nouvelleSoucoupe");
addSaucerButton.addEventListener("click", () => {
    theGame.addSaucer();
});

const autoCreateSaucerButton = document.getElementById("flotteSoucoupes");
let intervaltimer;
autoCreateSaucerButton.addEventListener("click", () => {
    if(theGame._autoAddSaucer == true) {
        theGame._autoAddSaucer = false;
        clearInterval(intervaltimer);
    }
    else {
        theGame._autoAddSaucer = true;
        intervaltimer = setInterval(function() { theGame.autoAddSaucer(); }, 750);
    }
});

window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));

window.addEventListener("load",init);
console.log('le bundle a été généré');


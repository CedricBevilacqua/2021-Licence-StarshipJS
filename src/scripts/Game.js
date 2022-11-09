import Starship from './Starship';
import Saucer from './Saucer';
import Shoot from './Shoot';

class Game {
    constructor(){
        this._theGame;
        this._canvas = document.getElementById("stars");
        this._saucerArray = new Array();
        this._shootArray = new Array();
        this._score = 0;
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._ship = new Starship(40, this._height / 2);
        this._requeteAnim = null;
        this._spaceOnPressure = false;
        this._spaceActionDone = false;
        this._autoAddSaucer = false;
        this.addSaucer();
    }

    autoAddSaucer() {
        const randomCreation = this.alea(2);
        if(randomCreation == 1) { this.addSaucer(); }
    }

    moveAndDraw() {
        const ctx = this._canvas.getContext("2d");
        // on efface le canvas avant de redessiner
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        // on dessine le vaisseau starship
        this._ship.draw(ctx);
        // on vérifie que les soucoupes sont dans le canvas puis on dessine les soucoupes volantes
        this.moveAndDrawSaucer(ctx);
        // on vérifie que les tirs sont dans le canvas et on les bouges
        this.moveAndDrawShots(ctx);
        // à la fin de la fonction on renouvelle la requête pour la prochaine animation
        this._requeteAnim = window.requestAnimationFrame(this.moveAndDraw.bind(this));
    }

    moveAndDrawSaucer(ctx) {
        this._saucerArray.forEach( saucer => { 
            if(this.verifInCanvas(saucer)) { saucer.draw(ctx); }
            else {
                if(saucer._x < 0) { this.addScore(-1000); }
                this._saucerArray.splice(this._saucerArray.indexOf(saucer),1);
                this.updateNbSaucers();
            }
        } );
    }

    moveAndDrawShots(ctx) {
        this._shootArray.forEach( shoot => { 
            let hitted = false;
            if(this.verifInCanvas(shoot)) {
                this._saucerArray.forEach( saucer => {
                    if(shoot.collision(saucer)) { 
                        this._shootArray.splice(this._shootArray.indexOf(shoot),1);
                        hitted = true;
                    }
                })
                if(hitted == false) { shoot.draw(ctx) };
            }
            else {
                this._shootArray.splice(this._shootArray.indexOf(shoot),1);
            }
        } );
    }

    verifInCanvas(element) {
        if (element._x < -element._width || element._x > this._width + element._width || element._y < -element._height || element._y > this._height + element._height) {
            return false;
        }
        return true;
    }

    addScore(points) {
        this._score = this._score + points;
        const scoreNumber = document.getElementById("score");
        scoreNumber.innerHTML = " " + this._score + " ";
    }
    
    stop(){
        window.cancelAnimationFrame(this._requeteAnim);
    }

    start(){
        this._requeteAnim = window.requestAnimationFrame(this.moveAndDraw.bind(this));
    }

    alea(borneMax) {
        return Math.floor(Math.random() * Math.floor(borneMax));
    }

    addSaucer() {
        const newSaucer = new Saucer(this._width, this.alea(this._height - 36), 3, 0);
        this._saucerArray.push(newSaucer);
        this.updateNbSaucers();
    }

    updateNbSaucers() {
        const addSaucerButton = document.getElementById("nouvelleSoucoupe");
        addSaucerButton.innerHTML = this._saucerArray.length + " <img src=\"./images/flyingSaucer-petit.png\" width=\"48\" alt=\"nouvelle soucoupe volante\"/>";
    }

    shoot() {
        if(this._spaceActionDone == false) {
            const newFireshoot = new Shoot(this._ship._x + this._ship._width, this._ship._y + this._ship._height / 2, 8, 0);
            this._shootArray.push(newFireshoot);
            this._spaceActionDone = true;
        }
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this._ship.moveUp();
                break;
            case "ArrowDown":
            case "Down":
                this._ship.moveDown();
                break;
            case " ":
                this._spaceOnPressure = true;
                this.shoot();
                break;
            default: return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
            case "ArrowDown":
            case "Down":
                this._ship.moveStop();
                break;
            case " ":
                this._spaceOnPressure = false;
                this._spaceActionDone = false;
                break;
            default: return;
        }
        event.preventDefault();
    }

    get theGame(){
        return this._theGame;
    }
    get canvas(){
        return this._canvas;
    }
    get saucerArray(){
        return this._saucerArray;
    }
    get score(){
        return this._score;
    }
    get width(){
        return this._width;
    }
    get height(){
        return this._height;
    }
}

var theGame = new Game();
// for a "true" singleton
theGame.constructor = undefined;
Object.getPrototypeOf(theGame).constructor = undefined;

export default theGame;
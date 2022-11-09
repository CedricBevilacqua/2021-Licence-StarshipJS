import SaucerIMGsrc from '../assets/images/flyingSaucer-petit.png';
import theGame from './Game';
import Mobile from './Mobile';
import MoveState from './MoveState';

export default class Saucer extends Mobile {

    constructor(x, y, deltaX, deltaY){  
        super(x, y, deltaX, deltaY, SaucerIMGsrc);
        this._moving = MoveState.GAUCHE;
        this._collision = true;
        this._width = 48;
        this._height = 36;
    }

    shotted() {
        if(this._collision == true) {
            this._collision = false;
            this._deltaX = 0;
            this._deltaY = 3;
            this._moving = MoveState.BAS;
            theGame.addScore(200);
        }
    }
}
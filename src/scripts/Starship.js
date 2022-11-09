import Mobile from './Mobile';
import MoveState from './MoveState';
import StarshipIMGsrc from '../assets/images/vaisseau-ballon-petit.png';
import theGame from './Game';

export default class Starship extends Mobile {

    constructor(x, y){  
        super(x, y, 0, 8, StarshipIMGsrc);
        this._moving = false;
        this._width = 48;
        this._height = 39;
    }

    move() {
        switch (this._moving) {
            case MoveState.HAUT:
                if(this._y - this.deltaY > 0) {
                    super.move();
                }
                break;
            case MoveState.BAS:
                if(this._y + this.deltaY < theGame._height - this._height) {
                    super.move();
                }
                break;
            default: return;
        }
    }

    moveUp() {
        this._moving = MoveState.HAUT;
    }

    moveDown() {
        this._moving = MoveState.BAS;
    }

    moveStop() {
        this._moving = MoveState.IMMOBILE;
    }

    get up(){
        if (this._moving == MoveState.HAUT){
            return true;
        }
        return false;
    }
    get down(){
        if (this._moving == MoveState.BAS){
            return true;
        }
        return false;
    }
}
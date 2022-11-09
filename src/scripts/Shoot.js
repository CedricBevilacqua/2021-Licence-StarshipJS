import ShootIMGsrc from '../assets/images/tir.png';
import Mobile from './Mobile';
import MoveState from './MoveState';

export default class Shoot extends Mobile {

    constructor(x, y, deltaX, deltaY){  
        super(x, y, deltaX, deltaY, ShootIMGsrc);
        this._moving = MoveState.DROITE;
        this._width = 32;
        this._height = 8;
    }

    collision(element) {
        if(element._collision == true && element._x <= this._x + this._width && element._y <= this._y + this._height && element._y + element._height >= this._y) {
            element.shotted();
            return true;
        }
        return false;
    }
}
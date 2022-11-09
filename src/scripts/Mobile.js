import MoveState from './MoveState';

export default class Mobile {

    constructor(x, y, deltaX, deltaY, image){  
        this._x = x;
        this._y = y;
        this._deltaX = deltaX;
        this._deltaY = deltaY;
        this._image = new Image();
        this._image.src = image; 
        this._moving = MoveState.IMMOBILE;
        this._width;
        this._height;
    }

    draw(context){
        this.move();
        context.drawImage(this._image, this._x, this._y);
    }

    move() {
        switch (this._moving) {
            case MoveState.HAUT:
                this._y = this._y - this._deltaY;
                break;
            case MoveState.BAS:
                this._y = this._y + this._deltaY;
                break;
            case MoveState.DROITE:
                this._x = this._x + this._deltaX;
                break;
            case MoveState.GAUCHE:
                this._x = this._x - this._deltaX;
                break;
            default: return;
        }
    }
    
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    get deltaX(){
        return this._deltaX;
    }
    get deltaY(){
        return this._deltaY;
    }
    get image(){
        return this._image;
    }
}
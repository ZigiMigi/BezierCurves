export class Vector {

    constructor(m) {
       this.vec = m;
    }

    toArray() {
        return [...this.vec];
    }

    length() {
        let leng = 0;
        for(let i = 0; i < this.vec.length; i++){
            leng += this.vec[i] * this.vec[i];
        }
        return Math.sqrt(leng);
    }

    add(v) {
        let ret = new Vector(this.toArray());
        for(let i = 0; i < this.vec.length; i++){
            ret.vec[i] += v.vec[i];
        }
        return ret;
    }

    sub(v){
        let ret = new Vector(this.toArray());
        for(let i = 0; i < this.vec.length; i++){
            ret.vec[i] -= v.vec[i];
        }
        return ret;
    }

    mul(v){
        let ret = new Vector(this.toArray());
        for(let i = 0; i < this.vec.length; i++){
            ret.vec[i] *= v.vec[i];
        }
        return ret;
    }

    div(v){
        let ret = new Vector(this.toArray());
        for(let i = 0; i < this.vec.length; i++){
            ret.vec[i] /= v.vec[i];
        }
        return ret;
    }

    mulScalar(s){
        let ret = new Vector(this.toArray());
        for(let i = 0; i < this.vec.length; i++){
            ret.vec[i] *= s;
        }
        return ret;
    }

    divScalar(s){
        let ret = new Vector(this.toArray());
        for(let i = 0; i < this.vec.length; i++){
            ret.vec[i] /= s;
        }
        return ret;
    }

 }

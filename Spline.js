import { Vector } from './Vector.js';
export class Spline {
    constructor(curves){
        this.n = curves.length;
        this.curves = curves;
    }

    value(t){
        if(Math.floor(t) >= this.n){
            return this.curves[this.n - 1].value(1);
        }
        return this.curves[Math.floor(t)].value(t % 1);
    }

    derivative(t){
        if(Math.floor(t) >= this.n){
            return this.curves[this.n - 1].derivative(1);
        }
        return this.curves[Math.floor(t)].derivative(t % 1);
    }

    makeContinuous(){
        for(let i = 0; i < this.n - 1; i++){
            let v = new Vector(this.curves[i].points[this.curves[0].n].add(
                this.curves[i + 1].points[0]).divScalar(2).toArray());
            this.curves[i].points[this.curves[0].n] = v;
            this.curves[i + 1].points[0] = v;
        }
    }

    makeSmooth(){
        for(let i = 1; i < this.n; i++){
            let der = (this.curves[i].derivative(0).add(this.curves[i - 1].derivative(1))).divScalar(2*3);
            this.curves[i - 1].points[2] = this.curves[i - 1].points[3].sub(der);
            this.curves[i].points[1] = this.curves[i - 1].points[3].mulScalar(2).sub(this.curves[i - 1].points[2]);
        }
    }
        
}



import { Vector } from './Vector.js';
import { Bernstein } from './Bernstein.js';
export class Bezier {
    constructor(points){
        this.points = points;
        this.n = this.points.length - 1;
    }

    value(t){
        let ret;
        for(let i = 0; i <= this.n; i++){
            let b = new Bernstein(this.n, i);
            if(i == 0){
                ret = new Vector(this.points[i].mulScalar(b.value(t)).toArray());
            }
            else{
                ret = ret.add(this.points[i].mulScalar(b.value(t))); 
            }
        }
        return ret;
    }

    derivative(t){
        let ret;
        for(let i = 0; i <= this.n - 1; i++){
            let pom = this.points[i + 1].sub(this.points[i]).mulScalar(this.n);
            let b = new Bernstein(this.n - 1, i);
            if(i == 0){
                ret = new Vector(pom.mulScalar(b.value(t)).toArray());
            }
            else{
                ret = ret.add(pom.mulScalar(b.value(t))); 
            }
        }
        return ret;
    }
}

export class Bernstein {

    constructor(n ,k) {
        this.fac = this.factorialize(n) / 
                    (this.factorialize(k) * this.factorialize(n - k));
        this.n = n;
        this.k = k;
        this.s = n - k;
     }

    factorialize(num) {
        if (num == 0){
            return 1;
        }
        else if(num < 0){
            return 0;
        }
        let ret = num;
        while (num != 0){
            num--;
            if (num == 0){
                break;
            }
            ret *= num;
        }
        return ret;
    }

    value(x) {
        if(this.k < 0 || this.k > this.n){
            return 0;
        }
        return this.fac * Math.pow(x, this.k) * Math.pow(1 - x, this.s);
    }

    derivative(x) {
        let b1 = new Bernstein(this.n - 1, this.k - 1);
        let b2 = new Bernstein(this.n - 1, this.k);
        return this.n * (b1.value(x) - b2.value(x)); 
    }
}



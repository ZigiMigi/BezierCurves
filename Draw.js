import { Vector } from './Vector.js';
import { Bezier } from './Bezier.js';
import { Spline } from './Spline.js';

export class Draw {

    constructor(){
        this.arr = new Array();
        this.ctx = canvas.getContext("2d");
        this.n = 0;
        this.bN = 0;
        this.spl = new Spline([]);
        this.color = "Black";
    }

    getCursorPositionDown(canvas, event, pom) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.arr.push(new Vector([x, y]));
        this.n = this.arr.length;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "Black";
        this.ctx.fill();
    }

    getCursorPositionUp(canvas, event, pom) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.arr.push(new Vector([x, y]));
        this.n = this.arr.length;
        this.ctx.strokeStyle = "Black";
        this.ctx.fillRect(x - 5, y - 5, 10, 10);
        if(this.n >= 4){
            this.bN++;
            this.spl.makeSmooth();
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(this.bN < 2){
                let b = new Bezier([this.arr[this.n - 4], this.arr[this.n - 3], this.arr[this.n - 1], this.arr[this.n - 2]]);
                this.spl.curves.push(b)
                this.spl.n++;
                this.drawBezier();
            }
            else{
                let b = new Bezier([this.arr[this.n - 4], this.arr[this.n - 4].mulScalar(2).sub(this.arr[this.n - 3]), this.arr[this.n - 1], this.arr[this.n - 2]]);
                this.spl.curves.push(b)
                this.spl.n++;
                this.drawBezier();
            }
        }
    }

    drawCircle(x, y){
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "Black";
        this.ctx.fill();
    }

    drawSquare(x, y){
        this.ctx.strokeStyle = "Black";
        this.ctx.fillRect(x - 5, y - 5, 10, 10);
        this.drawLine(this.n - 1);
    }

    drawLine(x1, y1, x2, y2){
        this.ctx.strokeStyle = "Black";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.setLineDash([5, 10]);
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawBlank(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawBezier(){
        for(let i = 0.001; i < this.bN; i += 0.001){
            this.ctx.beginPath();
            this.ctx.arc(this.spl.value(i).vec[0], this.spl.value(i).vec[1], 1, 0, 1 * Math.PI, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
        for(let i = 0; i < this.bN; i++){
            let b = this.spl.curves[i]
            for(let j = 0; j < 4; j++){
                if(j < 2){
                    if(j % 2 == 0){
                        this.drawCircle(b.points[j].vec[0], b.points[j].vec[1]);
                    }
                    else{
                        this.drawSquare(b.points[j].vec[0], b.points[j].vec[1]);
                        this.drawLine(b.points[j].vec[0], b.points[j].vec[1], b.points[j - 1].vec[0], b.points[j - 1].vec[1]);
                    }
                }
                else{
                    if(j % 2 == 0){
                        this.drawSquare(b.points[j].vec[0], b.points[j].vec[1]);
                    }
                    else{
                        this.drawCircle(b.points[j].vec[0], b.points[j].vec[1]); 
                        this.drawLine(b.points[j].vec[0], b.points[j].vec[1], b.points[j - 1].vec[0], b.points[j - 1].vec[1]);
                    }
                }
            }
        }
    }
}

import {minMax} from "./lib/common/js/utils.js";

const main = (): void => {
    initBanner();
    $("#experienceLevel").textContent = String((new Date()).getFullYear() - 2019);
    $("#copyright-year").textContent = String((new Date().getFullYear()));
}

addEventListener("load", main);

const $ = s => document.querySelector(s);

const getCss = (el, prop) => getComputedStyle(el).getPropertyValue(prop);

const initBanner = () => {
    const banner = $("#banner") as HTMLCanvasElement;
    const W = parseFloat(getCss(banner, "width"));
    const H = parseFloat(getCss(banner, "height"));
    banner.width = W;
    banner.height = H;
    const ctx = banner.getContext("2d");
    class Particle {
        // #canvas: HTMLCanvasElement;
        // #ctx: CanvasRenderingContext2D;
        #pos = [0, 0];
        #size = 30;
        #color = "";
        #vel = [0, 0];
        constructor() {
            // this.#canvas = document.createElement("canvas");
            // this.#canvas.width = w;
            // this.#canvas.height = h;
            // this.#ctx = this.#canvas.getContext("2d");

            this.#pos[0] = Math.random() * W;
            this.#pos[1] = Math.random() * H;
            this.#vel[0] = minMax(-30, 30);
            this.#vel[1] = minMax(-30, 30);
            this.#color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        }

        draw() {
            ctx.fillStyle = this.#color;
            ctx.fillRect(this.#pos[0], this.#pos[1], this.#size, this.#size);
        }

        update(dt: number) {
            this.#pos[0] -= this.#vel[0] * dt;
            this.#pos[1] -= this.#vel[1] * dt;
            // if(this.#pos[0] < -this.#size)
            if(this.#pos[1] < -this.#size) {
                this.#pos[1] = H + this.#size;
            }
        }
    }

    const particles = [];

    for(let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    $("#pfpImg");
    let w = 0;

    const update = () => {
        w += 0.02;
        particles.forEach(p => p.update(1/60));
    }

    const draw = () => {
        particles.forEach(p => p.draw());
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        ctx.save();
        ctx.beginPath();
        for(let i = 0; i <= 360; i++) {
            let a = i * Math.PI / 180;
            const r = 80 + Math.sin(i * 0.05) * 50;
            let x = (W * 0.5 + Math.sin(a) * r);
            let y = (H * 0.5 + Math.cos(a) * r);
            if(i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
       // ctx.drawImage($("#pfpImg"), cx - mr * 2, cy - mr * 2, mr * 2, mr * 2);
        ctx.restore();
    }

    const loop = () => {
        update();
        ctx.clearRect(0, 0, W, H);
        draw();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

}

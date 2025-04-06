var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
import { minMax } from "./lib/common/js/utils.js";
const main = () => {
    initBanner();
    $("#experienceLevel").textContent = String((new Date()).getFullYear() - 2019);
    $("#copyright-year").textContent = String((new Date().getFullYear()));
};
addEventListener("load", main);
const $ = s => document.querySelector(s);
const getCss = (el, prop) => getComputedStyle(el).getPropertyValue(prop);
const initBanner = () => {
    var _Particle_pos, _Particle_size, _Particle_color, _Particle_vel;
    const banner = $("#banner");
    const W = parseFloat(getCss(banner, "width"));
    const H = parseFloat(getCss(banner, "height"));
    banner.width = W;
    banner.height = H;
    const ctx = banner.getContext("2d");
    const label = ["C++", "Js", "Android", "Kotlin", "Jetpack", "Physics"];
    class Particle {
        constructor() {
            // this.#canvas = document.createElement("canvas");
            // this.#canvas.width = w;
            // this.#canvas.height = h;
            // this.#ctx = this.#canvas.getContext("2d");
            // #canvas: HTMLCanvasElement;
            // #ctx: CanvasRenderingContext2D;
            _Particle_pos.set(this, [0, 0]);
            _Particle_size.set(this, 30);
            _Particle_color.set(this, "");
            _Particle_vel.set(this, [0, 0]);
            __classPrivateFieldGet(this, _Particle_pos, "f")[0] = Math.random() * W;
            __classPrivateFieldGet(this, _Particle_pos, "f")[1] = Math.random() * H;
            __classPrivateFieldGet(this, _Particle_vel, "f")[0] = minMax(-30, 30);
            __classPrivateFieldGet(this, _Particle_vel, "f")[1] = minMax(-30, 30);
            __classPrivateFieldSet(this, _Particle_color, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`, "f");
        }
        draw() {
            ctx.fillStyle = __classPrivateFieldGet(this, _Particle_color, "f");
            ctx.fillRect(__classPrivateFieldGet(this, _Particle_pos, "f")[0], __classPrivateFieldGet(this, _Particle_pos, "f")[1], __classPrivateFieldGet(this, _Particle_size, "f"), __classPrivateFieldGet(this, _Particle_size, "f"));
        }
        update(dt) {
            __classPrivateFieldGet(this, _Particle_pos, "f")[0] -= __classPrivateFieldGet(this, _Particle_vel, "f")[0] * dt;
            __classPrivateFieldGet(this, _Particle_pos, "f")[1] -= __classPrivateFieldGet(this, _Particle_vel, "f")[1] * dt;
            // if(this.#pos[0] < -this.#size)
            if (__classPrivateFieldGet(this, _Particle_pos, "f")[1] < -__classPrivateFieldGet(this, _Particle_size, "f")) {
                __classPrivateFieldGet(this, _Particle_pos, "f")[1] = H + __classPrivateFieldGet(this, _Particle_size, "f");
            }
        }
    }
    _Particle_pos = new WeakMap(), _Particle_size = new WeakMap(), _Particle_color = new WeakMap(), _Particle_vel = new WeakMap();
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    const pfpImg = $("#pfpImg");
    let w = 0;
    const update = () => {
        w += 0.02;
        particles.forEach(p => p.update(1 / 60));
    };
    const draw = () => {
        particles.forEach(p => p.draw());
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        const cx = W * 0.5;
        const cy = H * 0.5;
        const mr = 80;
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i <= 360; i++) {
            let a = i * Math.PI / 180;
            const r = 80 + Math.sin(i * 0.05) * 50;
            let x = (W * 0.5 + Math.sin(a) * r);
            let y = (H * 0.5 + Math.cos(a) * r);
            if (i === 0)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        // ctx.drawImage($("#pfpImg"), cx - mr * 2, cy - mr * 2, mr * 2, mr * 2);
        ctx.restore();
    };
    const loop = () => {
        update();
        ctx.clearRect(0, 0, W, H);
        draw();
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};

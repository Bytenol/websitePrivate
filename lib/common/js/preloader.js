const Preloader = {
    loadImage(src) {
        const img = new Image();
        img.src = src;
        return new Promise((resolve) => {
            img.addEventListener("load", e => resolve(e));
        });
    }
};
export { Preloader };

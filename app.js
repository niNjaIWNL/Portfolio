// This creates a trail on mouse cursor
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce"
);

let lastParticleTime = 0;

document.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || event.pointerType ==="touch") {
        return;
    } // returns if user has reduce motion or is a touch screen without pointer

    const now = performance.now();

    if (now - lastParticleTime < 25) {
        return;
    }

    lastPerticleTime = now;

    const particle = document.createElement("span");

    particle.classList.add("cursor-particle")
    particle.setAttribute("aria-hidden", "true");

    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;

    document.body.appendChild(particle);

    particle.addEventListener("animationend", () => {
        particle.remove();
    }, {once: true });
});
// ends cursor trail

// This creates a space-like animated background
const canvas = document.querySelector("#space-background");
const context = canvas.getContext("2d")

const spaceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let width;
let height;
let stars = [];
let previousTime = null;
let animationId = null;

function resizeSpace() {
    
}
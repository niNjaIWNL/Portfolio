// This creates a trail on mouse cursor
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
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

    lastParticleTime = now;

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

function createStars() {
    const starCount = Math.floor((width * height) / 6000)

    stars = [];

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.3 + 0.3,
            opacity: Math.random() * 0.6 + 0.2,
            speed: Math.random() * 8 + 2,
            twinkleSpeed: Math.random() * 1.5 + 0.5,
            twinklePhase: Math.random() * Math.PI * 2
        });
    }
}

function drawStars() {
    context.clearRect(0, 0, width, height);

    for (const star of stars) {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        const brightness = 1 + Math.sin(star.twinklePhase) * 0.25;
        const opacity = star.opacity * brightness;

        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fill();
    }
}

function animateSpace(timestamp) {
    if (previousTime === null) {
        previousTime = timestamp;
    }

    const deltaTime = Math.min((timestamp - previousTime) / 1000, 0.05);
    previousTime = timestamp;

    for (const star of stars) {
        star.y += star.speed * deltaTime;
        star.twinklePhase += star.twinkleSpeed * deltaTime;

        if(star.y > height + star.radius) {
            star.y = -star.radius;
            star.x = Math.random() * width;
        }
    }

    drawStars();

    animationId = requestAnimationFrame(animateSpace);
}

function resizeSpace() {
    width = window.innerWidth;
    height = window.innerHeight;

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    createStars();
    drawStars();

    if (!spaceMotion.matches) {
        animationId = requestAnimationFrame(animateSpace);
    }
}

window.addEventListener("resize", resizeSpace);

resizeSpace();
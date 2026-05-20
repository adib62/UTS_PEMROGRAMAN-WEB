gsap.registerPlugin(ScrollTrigger);

// 1. LENIS SMOOTH SCROLL (Biar scrollnya lembut banget)
const lenis = new Lenis({ 
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. PRELOADER LOGIC
let loaded = 0;
let pInterval = setInterval(() => {
    loaded += Math.floor(Math.random() * 15) + 5;
    if (loaded >= 100) {
        loaded = 100;
        clearInterval(pInterval);
        setTimeout(() => {
            gsap.to("#preloader", { 
                opacity: 0, duration: 0.8, 
                onComplete: () => {
                    document.getElementById("preloader").style.display = "none";
                    initAnimations();
                }
            });
        }, 500);
    }
    const progText = document.getElementById("progress");
    const loadBar = document.getElementById("loader-bar");
    if(progText) progText.innerText = `${loaded}%`;
    if(loadBar) loadBar.style.width = `${loaded}%`;
}, 100);

// 3. GSAP ANIMATIONS
function initAnimations() {
    // Animasi Text/Element Reveal
    const revealElements = document.querySelectorAll(".gsap-reveal");
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            { 
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Mulai animasi pas elemen masuk 85% dari bawah layar
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Animasi Navbar Turun
    gsap.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power4.out" });
}
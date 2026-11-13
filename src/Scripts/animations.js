const { gsap, ScrollTrigger } = window;

if (!gsap || !ScrollTrigger) {
    throw new Error("animation.js requires GSAP and the GSAP ScrollTrigger plugin.");
}

gsap.registerPlugin(ScrollTrigger);

// Intro animation
const introTimeline = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.6,
        ease: "power2.out"
    }
});

introTimeline
    .from("#themeButtons > button", {
        y: -25,
        autoAlpha: 0,
        stagger: 0.1
    })
    .from("#mainNav", {
        y: -25,
        autoAlpha: 0
    }, "-=0.25")
    .from("#mainNav li", {
        y: -15,
        autoAlpha: 0,
        stagger: 0.08
    }, "-=0.25")
    .from("#welcomeText", {
        y: 25,
        autoAlpha: 0
    }, "-=0.2")
    .from("#myName", {
        y: 35,
        autoAlpha: 0
    }, "-=0.25")
    .from("#helloWorld, #introText", {
        y: 25,
        autoAlpha: 0,
        stagger: 0.12
    }, "-=0.25")
    .from("#heroButtons > *", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.12
    }, "-=0.25")
    .from("#overview", {
        x: 35,
        autoAlpha: 0
    }, "-=0.5");

introTimeline.play();

document.querySelector("#replayAnimation")?.addEventListener("click", () => {
    introTimeline.restart();
});

// Scroll progress bar
gsap.to("#progressBar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        markers: {
            startColor: "#00ff00",
            endColor: "#ff0000",
            fontSize: "12px",
            indent: 20
        }
    }
});

// Section animations; only the services section is pinned
const panels = gsap.utils.toArray(".scroll-panel");

panels.forEach(panel => {
    const isServices = panel.id === "services";
    const children = Array.from(panel.children);

    const sectionTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=100%",
            scrub: isServices ? 0.3 : 1,
            pin: isServices,
            pinSpacing: isServices,
            anticipatePin: isServices ? 1 : 0,
            invalidateOnRefresh: true,
            markers: {
                startColor: "#00ff00",
                endColor: "#ff0000",
                fontSize: "12px",
                indent: 20
            }
        }
    });

    sectionTimeline.fromTo(panel, {
        y: 40
    }, {
        y: 0,
        ease: "none",
        duration: 0.25
    });

    sectionTimeline.fromTo(children, {
        y: 25
    }, {
        y: 0,
        stagger: 0.06,
        ease: "none",
        duration: 0.45
    }, "<");

    sectionTimeline.to(panel, {
        y: 0,
        ease: "none",
        duration: 0.15
    });
});

// Footer reveal
gsap.from("#footer > *", {
    y: 30,
    autoAlpha: 0,
    stagger: 0.1,
    ease: "none",
    scrollTrigger: {
        trigger: "#footer",
        start: "top bottom",
        end: "top 60%",
        scrub: 0.7,
        markers: {
            startColor: "#00ff00",
            endColor: "#ff0000",
            fontSize: "12px",
            indent: 20
        }
    }
});

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});
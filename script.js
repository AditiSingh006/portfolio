// Highlight the active node on the trace rail as the user scrolls
const railNodes = document.querySelectorAll(".rail-node");
const sections = [...railNodes].map(node =>
    document.getElementById(node.dataset.target)
).filter(Boolean);

if (railNodes.length && sections.length && "IntersectionObserver" in window) {
    const setActive = (id) => {
        railNodes.forEach(node => {
            node.classList.toggle("active", node.dataset.target === id);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
    setActive("hero");
}

// Contact form — no backend wired up yet, so confirm locally instead of
// letting the page attempt (and fail) a real submission.
const contactForm = document.querySelector("#contact form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const button = contactForm.querySelector("button");
        const original = button.textContent;
        button.textContent = "Message noted ✓";
        contactForm.reset();
        setTimeout(() => { button.textContent = original; }, 2400);
    });
}

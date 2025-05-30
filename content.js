const replacements = {
    "Pre-final year student at JIIT": "🌟 Future Innovator",
    "Software Engineer": "Adventure Seeker",
    "Product Manager": "Relationship Builder",
    "CEO": "Life Partner Material",
    "Manager": "Caring Companion",
    "Intern": "Young at Heart"
};

function convertProfile() {
    // Add heart to profile name
    document.querySelectorAll('.text-heading-xlarge, .top-card-layout__title').forEach(el => {
        if (!el.textContent.includes('❤️')) {
            el.textContent += " ❤️";
        }
    });

    // Replace main profile headline
    document.querySelectorAll('.text-body-medium.break-words').forEach(el => {
        Object.entries(replacements).forEach(([key, val]) => {
            if (el.textContent.includes(key)) {
                el.textContent = val;
            }
        });
    });

    // Replace experience section titles
    document.querySelectorAll('.experience-item__title, .t-14.t-normal').forEach(el => {
        Object.entries(replacements).forEach(([key, val]) => {
            if (el.textContent.includes(key)) {
                el.textContent = val;
            }
        });
    });

    // Change "Connect" to "Flirt"
    document.querySelectorAll('.artdeco-button__text').forEach(el => {
        if (el.textContent.trim() === "Connect") {
            el.textContent = "💘 Flirt";
        }
    });
}

// Initial run
convertProfile();

// Observe dynamic content changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => convertProfile());
});
observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true 
});

const nukeIdentityCheck = () => {
    // 1. Remove the modal window
    const modals = document.querySelectorAll('div[role="dialog"]');
    modals.forEach(modal => {
        // Check for specific text to ensure we don't break other useful popups
        if (modal.innerText.includes("Identity verification") || 
            modal.innerText.includes("Complete a quick identity check")) {
            modal.remove();
            console.log("Pentest Tool: Modal Removed.");
        }
    });

    // 2. Remove the dark backdrop
    const backdrops = document.querySelectorAll('div[data-blocking-modal-backdrop="true"]');
    backdrops.forEach(backdrop => {
        backdrop.remove();
        console.log("Pentest Tool: Backdrop Removed.");
    });

    // 3. Force restore scrolling and interaction
    // Many sites set overflow to hidden or pointer-events to none on the body
    document.body.style.setProperty("overflow", "auto", "important");
    document.body.style.setProperty("pointer-events", "auto", "important");
    document.documentElement.style.setProperty("overflow", "auto", "important");
};

// Use a MutationObserver to catch the popup even if it loads after 5 seconds
const observer = new MutationObserver((mutations) => {
    nukeIdentityCheck();
});

// Start watching the page for changes
observer.observe(document.body, { childList: true, subtree: true });

// Run once on initial load
nukeIdentityCheck();
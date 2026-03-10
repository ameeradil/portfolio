document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.cert-card, .narxoz, .farabi').forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;
        const originalSrc = img.src;
        const hoverSrc = img.dataset.hover;
        if (!hoverSrc) return;

        const hoverTarget = card.classList.contains('narxoz') || card.classList.contains('farabi')
            ? img
            : card;

        hoverTarget.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
        });

        hoverTarget.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    });

  
    document.querySelectorAll('img[data-hover]').forEach(img => {
  
        if (img.closest('.cert-card, .narxoz, .farabi')) return;

        const originalSrc = img.src;
        const hoverSrc = img.dataset.hover;
        const container = img.parentElement;

        container.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
        });

        container.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    });
});


function updateDate() {
        const dateElement = document.getElementById('current-date');
        const now = new Date();

        // Format: Day (Number)
        const day = now.getDate();

        // Format: Month (Full Name)
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[now.getMonth()];

        // Format: Year (4 Digits)
        const year = now.getFullYear();

        // Combine into: 12 March 2026
        dateElement.textContent = `${day} ${month} ${year}`;
    }

    // Run the function when the page loads
    updateDate();

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.projects-parallax-section');
    const items = document.querySelectorAll('.parallax-item');
    if (!section || items.length === 0) return;

    // CRAZY SPEEDS: This creates the 'bombing' / overlapping effect
    // We use a mix of positive and negative to make some go UP and some go DOWN
    const uniqueSpeeds = [650, -150, 450, -300, 550, 200, -400];

    const handleParallax = () => {
        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;

        // Active zone: from when the top enters to when the bottom leaves
        if (rect.top < winH && rect.bottom > 0) {
            // progress: 0 (top of section at bottom of screen) to 1 (bottom of section at top)
            const progress = (winH - rect.top) / (winH + rect.height);

            items.forEach((item, index) => {
                const speed = uniqueSpeeds[index % uniqueSpeeds.length];
                
                // The 'Magic' Math: 
                // We multiply by (progress - 0.5) to ensure they move 
                // across their 'base' CSS position exactly at the middle of the scroll.
                const yOffset = (progress - 0.5) * -speed;
                
                // Applying 3D transform for hardware acceleration (no lag)
                item.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            });
        }
    };

    // Listen to all scroll methods (Wheel, Touch, Scrollbar)
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // Initial trigger
    handleParallax();
});

// alert('During this week, 9 March 2026, Iam updating the website design')

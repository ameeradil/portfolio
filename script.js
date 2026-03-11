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

    let targetY = Array.from(items).map(() => 0);
    let currentY = Array.from(items).map(() => 0);
    
    // Mix of High and Low speeds to create 'bombing' effect
    const speeds = [550, -150, 300, 480, -200, 180, 520];
    const smoothness = 0.08; // Slightly lower for a 'heavier' professional feel

    const updateCalculations = () => {
        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;

        if (rect.top < winH && rect.bottom > 0) {
            const progress = (winH - rect.top) / (winH + rect.height);
            items.forEach((_, index) => {
                const speed = speeds[index % speeds.length];
                targetY[index] = (progress - 0.5) * -speed;
            });
        }
    };

    const animate = () => {
        let isMoving = false;
        items.forEach((item, index) => {
            const diff = targetY[index] - currentY[index];
            
            // Only update if the difference is noticeable
            if (Math.abs(diff) > 0.01) {
                currentY[index] += diff * smoothness;
                item.style.transform = `translate3d(0, ${currentY[index]}px, 0)`;
                isMoving = true;
            }
        });
        requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', updateCalculations, { passive: true });
    updateCalculations(); // Initial set
    animate(); 
});

// alert('During this week, 9 March 2026, Iam updating the website design')

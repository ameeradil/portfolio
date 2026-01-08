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

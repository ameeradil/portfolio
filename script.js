document.addEventListener('DOMContentLoaded', () => {

    /* ============================= */
    /* Date System                  */
    /* ============================= */
    function updateDate() {
        const dateElement = document.getElementById('current-date');
        if (!dateElement) return;

        const now = new Date();
        const day = now.getDate();
        const monthNames = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();

        dateElement.textContent = `${day} ${month} ${year}`;
    }
    updateDate();

    /* ============================= */
    /* Projects Parallax Section    */
    /* ============================= */
    const section = document.querySelector('.projects-parallax-section');
    const items = document.querySelectorAll('.parallax-item');

    if (section && items.length > 0) {
        let targetY = Array.from(items).map(() => 0);
        let currentY = Array.from(items).map(() => 0);

        const speeds = [550, -150, 300, 480, -200, 180, 520];
        const smoothness = 0.08;

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
            items.forEach((item, index) => {
                const diff = targetY[index] - currentY[index];
                if (Math.abs(diff) > 0.01) {
                    currentY[index] += diff * smoothness;
                    item.style.transform = `translate3d(0, ${currentY[index]}px, 0)`;
                }
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', updateCalculations, { passive: true });
        updateCalculations();
        animate();
    }

    /* ============================= */
    /* Contact Form System          */
    /* ============================= */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formWrapper = contactForm.parentElement;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = "SENDING...";
            btn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();

                    formWrapper.style.transition = 'opacity 0.4s ease';
                    formWrapper.style.opacity = '0';

                    setTimeout(() => {
                        formWrapper.innerHTML = `
                            <div class="success-screen" style="text-align:center; padding:4rem 2rem; animation:fadeIn 0.5s ease-out forwards;">
                                <h3 style="color:#FFD700; font-family: monospace; font-size:2rem; margin-bottom:1rem;">
                                    [SUCCESS] MESSAGE_SENT
                                </h3>
                                <p style="color: rgba(255,255,255,0.7); font-size:1.2rem; margin-bottom:2rem;">
                                    Your message has been successfully delivered.
                                </p>
                                <button onclick="location.reload()" style="background:transparent; border:1px solid #FFD700; color:#FFD700; padding:1rem 2rem; cursor:pointer; font-family: monospace;">
                                    NEW_SESSION
                                </button>
                            </div>
                        `;
                        formWrapper.style.opacity = '1';
                    }, 400);
                } else {
                    throw new Error();
                }

            } catch (err) {
                btn.innerText = "FAILED! TRY AGAIN";
                btn.disabled = false;
            }

        });
    }

    /* ============================= */
    /* Animation Keyframes          */
    /* ============================= */
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    @keyframes fadeIn {
        from { opacity:0; transform:translateY(10px); }
        to { opacity:1; transform:translateY(0); }
    }`;
    document.head.appendChild(styleSheet);

});
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

                    item.style.transform =
                        `translate3d(0, ${currentY[index]}px, 0)`;

                }

            });

            requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', updateCalculations, { passive: true });

        updateCalculations();
        animate();
    }



    /* ============================= */
    /* Matter.js Skills Factory     */
    /* ============================= */

    const container = document.getElementById('factory-container');

    if (container) {

        const {
            Engine,
            Render,
            Runner,
            Bodies,
            Composite,
            Events,
            Mouse,
            MouseConstraint
        } = Matter;

        const engine = Engine.create();

        const render = Render.create({
            element: container,
            engine: engine,
            options: {
                width: container.clientWidth,
                height: container.clientHeight,
                wireframes: false,
                background: 'transparent'
            }
        });

        const wallOptions = {
            isStatic: true,
            render: { fillStyle: '#1a1a1a' }
        };

        const machinery = [

            Bodies.rectangle(150, 0, 300, 20,
                { ...wallOptions, angle: Math.PI * 0.1 }),

            Bodies.rectangle(750, 200, 400, 20,
                { ...wallOptions, angle: -Math.PI * 0.1 }),

            Bodies.rectangle(450, 610, 900, 60, wallOptions),

            Bodies.rectangle(-10, 300, 20, 600, wallOptions),

            Bodies.rectangle(910, 300, 20, 600, wallOptions)
        ];

        const skillList = [
            'HTML5','CSS3','JavaScript','Kotlin','Python',
            'Node.js','React','Git','PostgreSQL','TypeScript',
            'Security','Backend','C++','Linux','Matter.js'
        ];

        const skillBodies = [];

        skillList.forEach((skill, i) => {

            setTimeout(() => {

                const box = Bodies.rectangle(50, -50, 130, 45, {

                    chamfer: { radius: 5 },

                    restitution: 0.3,

                    friction: 0.1,

                    render: {
                        fillStyle: '#0d0d0d',
                        strokeStyle: '#FFAD1F',
                        lineWidth: 2,
                        skillName: skill
                    }

                });

                skillBodies.push(box);
                Composite.add(engine.world, box);

            }, i * 1500);

        });

        const mouse = Mouse.create(render.canvas);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });

        Composite.add(engine.world, [...machinery, mouseConstraint]);

        Events.on(render, 'afterRender', () => {

            const ctx = render.context;

            ctx.font = "600 14px 'JetBrains Mono', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            skillBodies.forEach(body => {

                const { x, y } = body.position;
                const angle = body.angle;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);

                ctx.fillStyle = "rgba(255,173,31,0.3)";
                ctx.fillRect(-60, -18, 120, 5);

                ctx.fillStyle = "#fff";
                ctx.fillText(body.render.skillName, 0, 5);

                ctx.restore();

            });

            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.font = "bold 20px sans-serif";

            ctx.fillText("SKILLS INTAKE", 150, 40);
            ctx.fillText("PROCESSING UNIT", 750, 240);

        });

        Render.run(render);
        Runner.run(Runner.create(), engine);
    }



    /* ============================= */
    /* Contact Form System          */
    /* ============================= */

    const contactForm = document.getElementById('contact-form');
    const terminalBody = document.querySelector('.terminal-body-wrapper');

    if (contactForm) {

        contactForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const btn = contactForm.querySelector('.submit-trigger');
            const btnText = btn.querySelector('.btn-text');

            const formData = new FormData(contactForm);

            btnText.innerText = "EXECUTING...";
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none";

            try {

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {

                    contactForm.reset();

                    terminalBody.style.transition = 'opacity 0.4s ease';
                    terminalBody.style.opacity = '0';

                    setTimeout(() => {

                        terminalBody.innerHTML = `
                        <div class="success-screen"
                        style="text-align:center;padding:8rem 2rem;animation:fadeIn 0.5s ease-out forwards;">
                        
                        <h3 style="color:#FFD700;font-family:monospace;font-size:2.4rem;margin-bottom:1rem;">
                        [SUCCESS] DATA_TRANSMITTED
                        </h3>

                        <p style="color:rgba(255,255,255,0.6);font-size:1.4rem;margin-bottom:3rem;">
                        The packet has been successfully routed to the destination server.
                        </p>

                        <button onclick="location.reload()"
                        style="background:transparent;border:1px solid #FFD700;color:#FFD700;padding:1rem 2rem;cursor:pointer;font-family:monospace;">
                        REBOOT_SESSION
                        </button>

                        </div>
                        `;

                        terminalBody.style.opacity = '1';

                    }, 400);

                } else {

                    throw new Error();

                }

            } catch (err) {

                btnText.innerText = "RETRY_PROTOCOL";
                btn.style.opacity = "1";
                btn.style.pointerEvents = "all";

            }

        });

    }

});


/* ============================= */
/* Animation Keyframes          */
/* ============================= */

const styleSheet = document.createElement("style");

styleSheet.innerText = `
@keyframes fadeIn {
from { opacity:0; transform:translateY(10px); }
to { opacity:1; transform:translateY(0); }
}
`;

document.head.appendChild(styleSheet);


// alert('During this week, 9 March 2026, Iam updating the website design')
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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('factory-container');
    if (!container) return;

    const { Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint } = Matter;

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

    // 1. Factory "Machinery" (Static Parts)
    const wallOptions = { isStatic: true, render: { fillStyle: '#1a1a1a' } };
    
    const machinery = [
        // The Entry Chute (Top Left)
        Bodies.rectangle(150, 0, 300, 20, { ...wallOptions, angle: Math.PI * 0.1 }),
        // The Second Slide (Right Side)
        Bodies.rectangle(750, 200, 400, 20, { ...wallOptions, angle: -Math.PI * 0.1 }),
        // The Floor
        Bodies.rectangle(450, 610, 900, 60, wallOptions),
        // Side Walls
        Bodies.rectangle(-10, 300, 20, 600, wallOptions),
        Bodies.rectangle(910, 300, 20, 600, wallOptions)
    ];

    const skillList = [
        'HTML5', 'CSS3', 'JavaScript', 'Kotlin', 'Python', 
        'Node.js', 'React', 'Git', 'PostgreSQL', 'TypeScript',
        'Security', 'Backend', 'C++', 'Linux', 'Matter.js'
    ];

    const skillBodies = [];
    
    // 2. The "Manufacturing" Loop
    // This spawns skills one by one so it looks like a factory line
    skillList.forEach((skill, i) => {
        setTimeout(() => {
            const box = Bodies.rectangle(50, -50, 130, 45, {
                chamfer: { radius: 5 },
                restitution: 0.3,
                friction: 0.1,
                render: {
                    fillStyle: '#0d0d0d',
                    strokeStyle: '#FFAD1F', // Your yellow
                    lineWidth: 2,
                    skillName: skill
                }
            });
            skillBodies.push(box);
            Composite.add(engine.world, box);
        }, i * 1500); // New skill every 1.5 seconds
    });

    // 3. Mouse Interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
    });

    Composite.add(engine.world, [...machinery, mouseConstraint]);

    // 4. Drawing the Skill Labels
    Events.on(render, 'afterRender', () => {
        const ctx = render.context;
        ctx.font = "600 14px 'JetBrains Mono', monospace"; // Industrial font
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        skillBodies.forEach(body => {
            const { x, y } = body.position;
            const angle = body.angle;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            // Draw a tiny "Serial Number" or decoration to look like a part
            ctx.fillStyle = "rgba(255, 173, 31, 0.3)";
            ctx.fillRect(-60, -18, 120, 5);
            
            // Main Text
            ctx.fillStyle = "#fff";
            ctx.fillText(body.render.skillName, 0, 5);
            ctx.restore();
        });

        // Draw "Factory Labels" on the machinery
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("SKILLS INTAKE", 150, 40);
        ctx.fillText("PROCESSING UNIT", 750, 240);
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);
});

// alert('During this week, 9 March 2026, Iam updating the website design')

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('skills-physics-container');
    if (!container) return;

    // 1. Core Setup
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: container.clientWidth,
            height: container.clientHeight,
            wireframes: false, // Turn off wireframes for professional look
            background: 'transparent'
        }
    });

    // 2. Define the 15 Skills (Name and SVG Texture)
    const skillData = [
        { name: 'HTML5', texture: 'assets/logos/html5.svg' },
        { name: 'CSS3', texture: 'assets/logos/css3.svg' },
        { name: 'JavaScript', texture: 'assets/logos/javascript.svg' },
        { name: 'Kotlin', texture: 'assets/logos/kotlin.svg' },
        { name: 'Node.js', texture: 'assets/logos/nodejs.svg' },
        { name: 'Python', texture: 'assets/logos/python.svg' },
        { name: 'PostgreSQL', texture: 'assets/logos/postgresql.svg' },
        { name: 'React', texture: 'assets/logos/react.svg' },
        { name: 'Git', texture: 'assets/logos/git.svg' },
        { name: 'Linux', texture: 'assets/logos/linux.svg' },
        { name: 'C++', texture: 'assets/logos/cpp.svg' },
        { name: 'TypeScript', texture: 'assets/logos/typescript.svg' },
        { name: 'Backend', texture: 'assets/logos/backend.svg' }, // Generic or specific
        { name: 'Security', texture: 'assets/logos/security.svg' },
        { name: 'Matter.js', texture: 'assets/logos/matterjs.svg' }
    ];

    // 3. Define the Static World (Ground & Walls - Invisible)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(render.options.width/2, render.options.height + 25, render.options.width, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, render.options.height/2, 50, render.options.height, wallOptions);
    const rightWall = Bodies.rectangle(render.options.width + 25, render.options.height/2, 50, render.options.height, wallOptions);

    // 4. Generate the 15 Skill Bodies
    const skillBodies = skillData.map((skill, index) => {
        // Random drop position
        const x = Math.random() * (render.options.width - 100) + 50;
        // Higher number here means more variation in when they hit the pile
        const y = Math.random() * -600; 

        // Calculate width based on text length for a dynamic look
        const dynamicWidth = skill.name.length * 10 + 60; // Dynamic based on text

        return Bodies.rectangle(x, y, dynamicWidth, 45, {
            chamfer: { radius: 10 }, // Rounded corners
            restitution: 0.6, // Slight bounce
            friction: 0.01, // Low friction for glide
            render: {
                fillStyle: '#0d0d0d', // Minimal black background
                strokeStyle: '#FFAD1F', // Your accent yellow
                lineWidth: 1,
                sprite: {
                    texture: skill.texture,
                    xScale: 0.6, // Scale down the SVGs
                    yScale: 0.6
                },
                text: {
                    content: skill.name,
                    color: '#FFFFFF',
                    size: 16,
                    family: 'Inter, sans-serif',
                    yOffset: 25 // Adjust text position below logo
                }
            }
        });
    });

    // 5. Setup Interactivity
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2, // Fast response
            render: { visible: false } // Hide the mouse 'string'
        }
    });

    // 6. Add everything to the world
    Composite.add(engine.world, [ground, leftWall, rightWall, ...skillBodies, mouseConstraint]);

    // 7. Initialize Runner & Render
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // --- Custom Professional Text Rendering ---
    // Matter.js doesn't natively draw text, so we add an 'afterRender' hook
    Matter.Events.on(render, 'afterRender', () => {
        const context = render.context;

        // Text properties
        context.font = "500 14px Inter, sans-serif";
        context.fillStyle = "rgba(255, 255, 255, 0.8)";
        context.textAlign = "center";
        context.textBaseline = "middle";

        skillBodies.forEach(block => {
            const { x, y } = block.position;
            const angle = block.angle;

            // Set text location relative to the block's current position and rotation
            context.save();
            context.translate(x, y);
            context.rotate(angle);
            // Draws the name from render.text.content
            context.fillText(block.render.text.content, 0, block.render.text.yOffset);
            context.restore();
        });
    });
});
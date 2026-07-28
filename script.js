window.addEventListener('load', () => {
    let progress = 0;
    const progressFill = document.getElementById('bootProgressFill');
    const statusText = document.getElementById('bootStatusText');
    const bootScreen = document.getElementById('bootScreen');

    const statuses = [
        "Loading kernel modules & graphics pipeline...",
        "Calibrating neural input peripherals...",
        "Mounting secure encrypted workspace...",
        "Crypton OS kernel online successfully."
    ];

    const bootInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(bootInterval);
            setTimeout(() => {
                if (bootScreen) bootScreen.classList.add('fade-out');
                triggerNotification("System Ready", "Welcome to Crypton OS. Press Shift+T for secret terminal.");
            }, 300);
        }
        if (progressFill) progressFill.style.width = progress + '%';
        if (statusText) {
            let statusIdx = Math.floor((progress / 100) * (statuses.length - 1));
            statusText.textContent = statuses[statusIdx];
        }
    }, 80);
});

// Custom Interactive Cursor Motion Engine
const cursorDot = document.getElementById('customCursorDot');
const cursorRing = document.getElementById('customCursorRing');
let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.top = mouseY + 'px';
        cursorDot.style.left = mouseX + 'px';
    }
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    if (cursorRing) {
        cursorRing.style.top = ringY + 'px';
        cursorRing.style.left = ringX + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, .taskbar-app, .reg-btn, .menu-item, input, .domain-card, .upload-btn-label')) {
        document.body.classList.add('cursor-hover');
    }
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest('button, .taskbar-app, .reg-btn, .menu-item, input, .domain-card, .upload-btn-label')) {
        document.body.classList.remove('cursor-hover');
    }
});

// Advanced Interactive Particle & Wave Wallpaper Engine
const canvas = document.getElementById('wallpaperCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
const numParticles = 75;
let wallpaperActive = true;
let canvasMouse = { x: -1000, y: -1000, radius: 170 };

window.addEventListener('mousemove', (e) => {
    canvasMouse.x = e.clientX;
    canvasMouse.y = e.clientY;
});

window.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        canvasMouse.x = e.touches[0].clientX;
        canvasMouse.y = e.touches[0].clientY;
    }
}, {passive: true});

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        if(!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 2 + 1;
        const colors = ['rgba(99, 102, 241, 0.8)', 'rgba(236, 72, 153, 0.8)', 'rgba(6, 182, 212, 0.8)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        if(!canvas) return;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        let dx = canvasMouse.x - this.x;
        let dy = canvasMouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < canvasMouse.radius) {
            let force = (canvasMouse.radius - dist) / canvasMouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
        }
    }
    draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

for (let i = 0; i < numParticles; i++) particles.push(new Particle());

function animateWallpaper() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (wallpaperActive) {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - dist / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }
    }
    requestAnimationFrame(animateWallpaper);
}
animateWallpaper();

function toggleWallpaperMode() {
    wallpaperActive = !wallpaperActive;
    if(canvas) canvas.style.opacity = wallpaperActive ? '1' : '0';
    triggerNotification("Wallpaper Mode", `Live background ${wallpaperActive ? 'activated' : 'deactivated'}.`);
}

function updateSystemMetrics() {
    const now = new Date();
    document.getElementById('islandClock').textContent = now.toLocaleTimeString();
    document.getElementById('islandDate').textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
setInterval(updateSystemMetrics, 1000);
updateSystemMetrics();

const contextMenu = document.getElementById('desktopContextMenu');
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.classList.add('visible');
});
window.addEventListener('click', () => {
    if (contextMenu) contextMenu.classList.remove('visible');
});

function triggerNotification(title, msg) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = `
        <div class="toast-title"><i class="fa-solid fa-bell"></i> ${title}</div>
        <div class="toast-msg">${msg}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

window.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'T' || e.key === 't')) {
        e.preventDefault();
        toggleApp('terminal');
    }
});

const appData = {
    about: {
        title: "About Crypton",
        icon: "fa-circle-info",
        content: `
            <div class="about-grid">
                <div class="about-card">
                    <h3><i class="fa-solid fa-rocket"></i> Why Crypton?</h3>
                    <p>Crypton is a special coding event built to help students learn skills that matter in the real world. Instead of being just for fun, it teaches participants how to solve problems that businesses and communities actually face. The event has three parts: Impact & Innovation, where students design tools like smart subscriptions or apps that give instant feedback; Game & Growth, where they create fun games that people enjoy and companies can earn money from; and Cyber Circuit, where they build new ways to protect data and stop hackers. Each challenge is practical, creative, and can be turned into something useful outside the classroom.

The goal of Crypton is to prepare students for the future by giving them portfolio-ready projects that show creativity, coding ability, and problem-solving skills. Students can use any resource they want — like apps, libraries, or online tools — but they must prove they can apply them to real-world problems. This makes Crypton different from normal competitions, which are often just for entertainment. Here, every project has the chance to grow into something that helps businesses, communities, or even industries. In short, Crypton is a launchpad for the next generation of builders, gamers, and digital defenders.</p>
                </div>
            </div>
        `
    },
    domains: {
        title: "Event Domains",
        icon: "fa-layer-group",
        content: `
            <div class="domains-grid">
                <div class="domain-card">
                    <h3><i class="fa-solid fa-bolt"></i> DOMAIN 1 - Impact & Innovation</h3>
                    <p>In Domain 1: Impact & Innovation, solving real-world problems with high-impact scalable solutions means creating technology that directly improves everyday life and can grow to help larger groups or businesses. The focus is not on small classroom projects but on building tools that people would actually use — solutions that make work easier, save time, or open new opportunities. By tackling challenges that matter to communities and industries, students learn how coding can move beyond theory into practical applications that generate real value and lasting impact.</p>
                </div>
                <div class="domain-card">
                    <h3><i class="fa-solid fa-gamepad"></i> DOMAIN 2 - Game & Growth</h3>
                    <p>In Domain 2: Game & Growth, the theme “Build engaging next‑gen interactive applications” highlights the importance of creating digital experiences that go beyond simple entertainment and instead capture attention through creativity, interactivity, and long‑term engagement. As described in the document, this domain is about designing modern games and applications that feel fresh, addictive, and sustainable — projects that can adapt to changing user needs, encourage collaboration, and even support monetization. By focusing on interactive design and scalable mechanics, students learn how coding can merge with storytelling, psychology, and economics to produce applications that resonate with today’s audiences and remain impactful in the future.</p>
                </div>
                <div class="domain-card">
                    <h3><i class="fa-solid fa-shield-halved"></i> DOMAIN 3 – Cyber Circuit</h3>
                    <p>In Domain 3: Cyber Circuit, the theme “Develop robust security architectures and protocols” emphasizes building strong systems that protect users and organizations from digital threats. As described in the document, this domain is about going beyond basic tools to design innovative approaches that ensure trust, safety, and resilience in technology. Students are encouraged to think like guardians of the digital world, creating solutions that can withstand attacks, adapt to new risks, and safeguard sensitive information. By focusing on robust architectures and protocols, participants learn how cybersecurity is not just about defense but about building reliable foundations for the future of technology.</p>
                </div>
            </div>
        `
    },
    timeline: {
        title: "Event Schedule Timeline",
        icon: "fa-timeline",
        content: `
            <div class="domains-grid">
                <div class="about-card">
                    <h3><i class="fa-solid fa-hourglass-start"></i> Phase 1: Beta Test Preview</h3>
                    <p>Under Construction</p>
                </div>
            </div>
        `
    },
    registration: {
        title: "Registration Portal",
        icon: "fa-file-pen",
        content: `
            <div class="reg-container">
                <h2>Ready to Build the Future?</h2>
                <p>Secure your slot in Crypton via official team submission forms.</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfEPWy9aZwKph0droxHLCEiJ0UWqSd2fl6wOdk7cTa_HTpjbA/viewform?usp=publish-editor" target="_blank" class="reg-btn">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Submission Form
                </a>
            </div>
        `
    },
    brochure: {
        title: "Event Brochure",
        icon: "fa-book-open",
        content: `
            <div class="media-app-container">
                <div class="pdf-viewer-wrapper" id="pdfViewerWrapper">
                    <iframe src="Crypton.pdf" class="pdf-iframe" id="pdfFrame"></iframe>
                </div>
            </div>
        `
    },
    trailer: {
        title: "Event Trailer",
        icon: "fa-film",
        content: `
            <div class="media-app-container">
                <div class="video-player-wrapper">  
                    <video controls autoplay class="trailer-video" id="trailerVideo">
                        <source src="trailer.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        `
    },
    credits: {
        title: "Credits & Acknowledgments",
        icon: "fa-award",
        content: `
            <div class="about-grid">
                <div class="about-card">
                    <h3><i class="fa-solid fa-users"></i> Core Team</h3>
                    <p>Built and run by Alliance Group. [Operating with MPL License 2.0]</p>
                </div>
            </div>
        `
    },
    terminal: {
        title: "Secure Terminal",
        icon: "fa-terminal",
        isTerminal: true
    }
};

let activeWindows = {};
let windowStates = {}; 
let highestZIndex = 100;

function toggleApp(appId) {
    if (activeWindows[appId]) {
        if (windowStates[appId] === 'minimized') {
            restoreApp(appId);
        } else if (getTopWindow(appId)) {
            minimizeApp(appId);
        } else {
            bringToFront(activeWindows[appId]);
        }
    } else {
        openApp(appId);
    }
}

function getTopWindow(appId) {
    const win = activeWindows[appId];
    return win && win.style.zIndex == highestZIndex;
}

function openApp(appId) {
    const data = appData[appId];
    const win = document.createElement('div');
    win.className = 'os-window';
    win.style.top = `${60 + (Object.keys(activeWindows).length * 22)}px`;
    win.style.left = `${100 + (Object.keys(activeWindows).length * 22)}px`;

    const headerHTML = `
        <div class="window-header" onmousedown="initDrag(event, this.parentElement)" ontouchstart="initDrag(event, this.parentElement)">
            <div class="window-title">
                <i class="fa-solid ${data.icon}"></i> ${data.title}
            </div>
            <div class="window-controls">
                <button class="window-btn btn-minimize" onclick="minimizeApp('${appId}')"></button>
                <button class="window-btn btn-maximize" onclick="toggleMaximize(this.closest('.os-window'))"></button>
                <button class="window-btn btn-close" onclick="closeApp('${appId}')"></button>
            </div>
        </div>
    `;

    let bodyContent = "";
    if (data.isTerminal) {
        bodyContent = `
            <div class="window-body terminal-body" onclick="focusTerminalInput(this)">
                <div class="terminal-output">Crypton Secure Terminal v4.5.0
Type 'help' to inspect available advanced shell commands.</div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">vault@crypton:~#</span>
                    <input type="text" class="terminal-input" autofocus onkeydown="handleTerminalCommand(event, this)">
                </div>
            </div>
        `;
    } else {
        bodyContent = `<div class="window-body">${data.content}</div>`;
    }

    win.innerHTML = headerHTML + bodyContent;
    document.getElementById('workspace').appendChild(win);
    activeWindows[appId] = win;
    windowStates[appId] = 'open';

    requestAnimationFrame(() => win.classList.add('open'));
    updateTaskbarState(appId, 'open');
    bringToFront(win);
}

function minimizeApp(appId) {
    const win = activeWindows[appId];
    if (!win) return;
    win.classList.add('minimized');
    windowStates[appId] = 'minimized';
    updateTaskbarState(appId, 'minimized');
}

function restoreApp(appId) {
    const win = activeWindows[appId];
    if (!win) return;
    win.classList.remove('minimized');
    windowStates[appId] = 'open';
    updateTaskbarState(appId, 'open');
    bringToFront(win);
}

function closeApp(appId) {
    const win = activeWindows[appId];
    if (!win) return;
    win.classList.remove('open');
    setTimeout(() => {
        win.remove();
        delete activeWindows[appId];
        delete windowStates[appId];
        updateTaskbarState(appId, 'closed');
    }, 200);
}

function bringToFront(win) {
    highestZIndex++;
    win.style.zIndex = highestZIndex;
}

function updateTaskbarState(appId, state) {
    const taskbarApps = document.querySelectorAll('#taskbarAppsContainer .taskbar-app');
    const indexMap = { about: 0, domains: 1, timeline: 2, registration: 3, brochure: 4, trailer: 5, credits: 6 };
    const idx = indexMap[appId];
    if (idx !== undefined && taskbarApps[idx]) {
        taskbarApps[idx].classList.remove('active', 'minimized');
        if (state === 'open') taskbarApps[idx].classList.add('active');
        else if (state === 'minimized') taskbarApps[idx].classList.add('minimized');
    }
}

function clearAllWindows() {
    Object.keys(activeWindows).forEach(appId => minimizeApp(appId));
    triggerNotification("Workspace", "All active windows minimized.");
}

function initDrag(e, win) {
    bringToFront(win);
    if (e.target.classList.contains('window-btn')) return;
    if (win.dataset.maximized === "true") return;

    let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    let clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
    let rect = win.getBoundingClientRect();

    let startX = clientX;
    let startY = clientY;

    function onMouseMove(moveEvent) {
        let mx = moveEvent.clientX || (moveEvent.touches ? moveEvent.touches[0].clientX : 0);
        let my = moveEvent.clientY || (moveEvent.touches ? moveEvent.touches[0].clientY : 0);
        let dx = mx - startX;
        let dy = my - startY;
        win.style.top = `${rect.top + dy}px`;
        win.style.left = `${rect.left + dx}px`;
    }

    function onMouseUp() {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchmove', onMouseMove);
        window.removeEventListener('touchend', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove, {passive: true});
    window.addEventListener('touchend', onMouseUp);
}

function toggleMaximize(win) {
    const taskbar = document.getElementById('taskbar');
    const dynamicIsland = document.getElementById('dynamicIsland');

    if (win.dataset.maximized === "true") {
        win.style.width = "760px";
        win.style.height = "500px";
        win.style.top = win.dataset.prevTop;
        win.style.left = win.dataset.prevLeft;
        win.style.borderRadius = "16px";
        win.dataset.maximized = "false";
        win.style.zIndex = highestZIndex;
        
        taskbar.style.opacity = '1';
        taskbar.style.transform = 'translateX(-50%) translateY(0)';
        taskbar.style.pointerEvents = 'auto';
        dynamicIsland.style.opacity = '1';
        dynamicIsland.style.visibility = 'visible';
    } else {
        win.dataset.prevTop = win.style.top;
        win.dataset.prevLeft = win.style.left;
        win.style.top = "0px";
        win.style.left = "0px";
        win.style.width = "100%";
        win.style.height = "100%";
        win.style.borderRadius = "0px";
        win.dataset.maximized = "true";
        win.style.zIndex = "999999";

        taskbar.style.opacity = '0';
        taskbar.style.transform = 'translateX(-50%) translateY(50px)';
        taskbar.style.pointerEvents = 'none';
        dynamicIsland.style.opacity = '0';
        dynamicIsland.style.visibility = 'hidden';
    }
}

function loadPDFBrochure(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        const iframe = document.getElementById('pdfFrame');
        if (iframe) iframe.src = fileURL;
        triggerNotification("Brochure Loaded", file.name);
    }
}

function loadMP4Trailer(event) {
    const file = event.target.files[0];
    if (file && file.type === 'video/mp4') {
        const fileURL = URL.createObjectURL(file);
        const video = document.getElementById('trailerVideo');
        if (video) {
            video.src = fileURL;
            video.load();
            video.play();
        }
        triggerNotification("Trailer Loaded", file.name);
    }
}

function focusTerminalInput(bodyEl) {
    const input = bodyEl.querySelector('.terminal-input');
    if (input) input.focus();
}

function handleTerminalCommand(e, inputEl) {
    if (e.key === 'Enter') {
        const fullCmd = inputEl.value.trim();
        const cmdParts = fullCmd.split(' ');
        const cmd = cmdParts[0].toLowerCase();
        const outputArea = inputEl.closest('.window-body').querySelector('.terminal-output');
        let response = "";

        if (cmd === 'help') {
            response = `Available advanced shell commands:
  help       - List all system shell commands
  about      - Display system platform info
  domains    - Inspect active event domains
  matrix     - Toggle hacker matrix aesthetic mode
  status     - Print detailed hardware diagnostics
  clear      - Clear terminal screen buffer
  reboot     - Restart Crypton OS kernel`;
        } else if (cmd === 'about') {
            response = "Crypton OS v4.5: Engineered for next-gen student innovation.";
        } else if (cmd === 'domains') {
            response = "1. Impact & Innovation\n2. Game & Growth\n3. Cyber Circuit";
        } else if (cmd === 'matrix') {
            document.body.style.color = document.body.style.color === 'rgb(34, 197, 94)' ? '#f0f0f5' : '#22c55e';
            response = "Matrix aesthetic theme toggled successfully.";
        } else if (cmd === 'status') {
            response = "GPU Pipeline: Active | Security: Enforced";
        } else if (cmd === 'clear') {
            outputArea.textContent = "";
            inputEl.value = "";
            return;
        } else if (cmd === 'reboot') {
            location.reload();
            return;
        } else if (cmd === "") {
            response = "";
        } else {
            response = `command not found: ${fullCmd}. Type 'help' for valid commands.`;
        }

        outputArea.textContent += `\nvault@crypton:~# ${fullCmd}\n${response}`;
        inputEl.value = "";
        const windowBody = outputArea.closest('.window-body');
        windowBody.scrollTop = windowBody.scrollHeight;
    }
}
/**
 * SOUMYADIP SARKAR - SPACETIME GRAVITATIONAL & UNEVEN FIERY EMISSION ENGINE v5.0
 * 
 * Key Features:
 * 1. Pure Pitch-Black Body (#000000) with Razor-Sharp Hot-White & Fiery Orange Photon Ring.
 * 2. Uneven, Organic & Turbulent Light Waves (Fiery Orange #FF4500, Bright Yellow #FFD700, Hot White #FFFFFF).
 * 3. Prominent Orbiting Planet with Fiery Atmosphere & Glowing Orbiting Text Caption.
 * 4. Deep Spacetime Coordinate Warping under Heavy Cursor Weight.
 * 5. Persistent Spacetime Continuum on Page 2 with SS Nucleus Gravitational Curvature.
 * 6. Searing Fiery Supernova Collapse Transition into Deep Black Page 2.
 */

class SpacetimeEngine {
  constructor() {
    this.canvas = document.getElementById('spacetime-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Singularity (Dense Pitch-Black Body on Page 1)
    this.singularity = {
      x: this.width * 0.72,
      y: this.height * 0.5,
      targetX: this.width * 0.72,
      targetY: this.height * 0.5,
      baseRadius: Math.min(this.width, this.height) * 0.165,
      currentRadius: Math.min(this.width, this.height) * 0.165,
      mass: 26000,
      influenceRadius: Math.min(this.width, this.height) * 0.65
    };

    // Heavy Cursor Mass (Bending spacetime fabric)
    this.mouse = {
      x: this.width * 0.35,
      y: this.height * 0.5,
      prevX: this.width * 0.35,
      prevY: this.height * 0.5,
      vx: 0,
      vy: 0,
      mass: 9800, // Deep gravitational well
      radius: 270,
      hasMoved: false
    };

    // Spacetime Grid Configuration
    this.gridSpacing = 60;
    this.cols = 0;
    this.rows = 0;
    this.nodes = [];

    // Background Stars
    this.stars = [];
    this.numStars = Math.min(Math.floor((this.width * this.height) / 20000), 60);

    // Orbiting Debris & Micro-Asteroids
    this.numRocks = 42;
    this.rocks = [];

    // Prominent Orbiting Planet
    this.planet = {
      angle: 0.7,
      orbitA: this.singularity.baseRadius * 2.35,
      orbitB: this.singularity.baseRadius * 1.35,
      inclination: -0.22,
      speed: 0.0055,
      radius: 9.5, // Prominent size
      caption: "im a small body revolving around the vast expanse of CSE"
    };

    // Transition State
    this.isTransitioning = false;
    this.transitionProgress = 0.0;
    this.transitionDuration = 3200; // ms
    this.hasFiredPeakCover = false;
    this.lastLandingFrame = 0;

    // Page 2 Nucleus Coordinates
    this.isPage2Active = false;
    this.nucleusPos = { x: this.width * 0.5, y: this.height * 0.5, mass: 18000, radius: 280 };

    this.init();
  }

  init() {
    this.resize();
    this.createGrid();
    this.createStars();
    this.createDebris();
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);

    const isMobile = this.width < 1024;
    this.singularity.x = isMobile ? this.width * 0.5 : this.width * 0.72;
    this.singularity.y = isMobile ? this.height * 0.65 : this.height * 0.5;
    this.singularity.targetX = this.singularity.x;
    this.singularity.targetY = this.singularity.y;
    this.singularity.baseRadius = Math.min(this.width, this.height) * (isMobile ? 0.175 : 0.165);
    this.singularity.currentRadius = this.singularity.baseRadius;
    this.singularity.influenceRadius = Math.min(this.width, this.height) * (isMobile ? 0.72 : 0.65);

    this.planet.orbitA = this.singularity.baseRadius * 2.35;
    this.planet.orbitB = this.singularity.baseRadius * 1.35;

    this.createGrid();
  }

  createGrid() {
    this.cols = Math.ceil(this.width / this.gridSpacing) + 2;
    this.rows = Math.ceil(this.height / this.gridSpacing) + 2;
    this.nodes = [];

    for (let r = 0; r < this.rows; r++) {
      this.nodes[r] = [];
      for (let c = 0; c < this.cols; c++) {
        const ox = (c - 1) * this.gridSpacing;
        const oy = (r - 1) * this.gridSpacing;
        this.nodes[r][c] = {
          originX: ox,
          originY: oy,
          x: ox,
          y: oy,
          vx: 0,
          vy: 0
        };
      }
    }
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        baseX: Math.random() * this.width,
        baseY: Math.random() * this.height,
        size: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.55 + 0.15,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? '#FFFFFF' : (Math.random() > 0.5 ? '#FFD700' : '#FF4500')
      });
    }
  }

  createDebris() {
    this.rocks = [];
    for (let i = 0; i < this.numRocks; i++) {
      const rRatio = Math.pow(Math.random(), 1.25);
      const minR = this.singularity.baseRadius * 1.15;
      const maxR = this.singularity.baseRadius * 2.75;
      const radius = minR + rRatio * (maxR - minR);

      this.rocks.push({
        baseRadius: radius,
        radius: radius,
        angle: Math.random() * Math.PI * 2,
        speed: (0.012 * Math.pow(this.singularity.baseRadius / radius, 1.25)) * (0.85 + Math.random() * 0.3),
        size: Math.random() * 2.4 + 0.9,
        alpha: Math.random() * 0.65 + 0.3,
        color: Math.random() > 0.4 ? '#FFFFFF' : (Math.random() > 0.5 ? '#FFD700' : '#FF5722')
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createStars();
      this.createDebris();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.vx = e.clientX - this.mouse.x;
      this.mouse.vy = e.clientY - this.mouse.y;
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.hasMoved = true;

      // Parallax on the black body
      if (!this.isTransitioning && !this.isPage2Active) {
        const isMobile = this.width < 1024;
        const centerX = isMobile ? this.width * 0.5 : this.width * 0.72;
        const centerY = isMobile ? this.height * 0.65 : this.height * 0.5;
        this.singularity.targetX = centerX + (e.clientX - this.width * 0.5) * 0.035;
        this.singularity.targetY = centerY + (e.clientY - this.height * 0.5) * 0.035;
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        this.mouse.vx = t.clientX - this.mouse.x;
        this.mouse.vy = t.clientY - this.mouse.y;
        this.mouse.x = t.clientX;
        this.mouse.y = t.clientY;
        this.mouse.hasMoved = true;
      }
    }, { passive: true });
  }

  /**
   * Searing Fiery Transition (Zero-Flicker Synchronized)
   */
  triggerEngulfTransition(onPeakCover, onFinish) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.hasFiredPeakCover = false;

    const startTime = performance.now();
    const duration = this.transitionDuration;

    const animateTransition = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      this.transitionProgress = progress;

      if (progress < 0.46) {
        // Phase 1: Intense gravitational collapse
        const t = progress / 0.46;
        this.singularity.mass = 26000 + t * 40000;
        this.singularity.currentRadius = this.singularity.baseRadius * (1.0 - t * 0.15);
      } else {
        // Phase 2: Searing uneven fiery blastwave swelling outward
        const t = (progress - 0.46) / 0.54;
        const ease = Math.pow(t, 2.6);
        this.singularity.currentRadius = this.singularity.baseRadius * (1.0 - 0.15 + ease * 28.0);
        this.singularity.mass = 66000 + ease * 140000;

        // Zero-Flicker DOM swap at peak cover
        if (progress >= 0.52 && !this.hasFiredPeakCover) {
          this.hasFiredPeakCover = true;
          if (typeof onPeakCover === 'function') {
            onPeakCover();
          }
        }
      }

      if (progress < 1.0) {
        requestAnimationFrame(animateTransition);
      } else {
        if (typeof onFinish === 'function') {
          onFinish();
        }
      }
    };

    requestAnimationFrame(animateTransition);
  }

  resetExpansion() {
    this.isTransitioning = false;
    this.transitionProgress = 0.0;
    this.hasFiredPeakCover = false;
    this.isPage2Active = false;
    this.singularity.mass = 26000;
    this.resize();
  }

  setPage2Active(isActive) {
    this.isPage2Active = isActive;
  }

  /**
   * Main Physics & Animation Loop
   */
  animate(timestamp) {
    if (!this.isPage2Active && timestamp - this.lastLandingFrame < 42) {
      requestAnimationFrame(this.animate);
      return;
    }
    if (!this.isPage2Active) this.lastLandingFrame = timestamp;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Singularity coordinates smoothing
    this.singularity.x += (this.singularity.targetX - this.singularity.x) * 0.05;
    this.singularity.y += (this.singularity.targetY - this.singularity.y) * 0.05;

    const bx = this.singularity.x;
    const by = this.singularity.y;
    const br = this.singularity.currentRadius;
    const bMass = this.singularity.mass;
    const bInfluence = this.singularity.influenceRadius * (1.0 + this.transitionProgress * 2.0);

    const mx = this.mouse.x;
    const my = this.mouse.y;
    const mMass = this.mouse.mass;
    const mRadius = this.mouse.radius;

    // Track Page 2 SS Nucleus position dynamically
    let n2X = this.width * 0.5;
    let n2Y = this.height * 0.5;
    if (this.isPage2Active) {
      const hubEl = document.getElementById('central-hub');
      if (hubEl) {
        const rect = hubEl.getBoundingClientRect();
        n2X = rect.left + rect.width * 0.5;
        n2Y = rect.top + rect.height * 0.5;
        this.nucleusPos.x = n2X;
        this.nucleusPos.y = n2Y;
      }
    }

    const focusX = this.isPage2Active ? n2X : bx;
    const focusY = this.isPage2Active ? n2Y : by;
    const focusInfluence = this.isPage2Active ? this.nucleusPos.radius : bInfluence;

    const springK = 0.055;
    const damping = 0.85;

    // =========================================================================
    // 1. UPDATE SPACETIME GRID NODES (Curved by Black Body on Page 1 / SS Nucleus on Page 2)
    // =========================================================================
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const node = this.nodes[r][c];

        let targetX = node.originX;
        let targetY = node.originY;

        if (!this.isPage2Active) {
          // Page 1: Gravity from Black Body
          const dxB = bx - node.originX;
          const dyB = by - node.originY;
          const distSqB = dxB * dxB + dyB * dyB;
          const distB = Math.sqrt(distSqB);

          if (distB < bInfluence) {
            const pullB = Math.exp(-distSqB / (bInfluence * bInfluence * 0.45));
            const forceB = (bMass / (distB + 75)) * pullB;
            targetX += (dxB / (distB || 1)) * forceB;
            targetY += (dyB / (distB || 1)) * forceB;
          }
        } else {
          // Page 2: SS Nucleus actively bends spacetime
          const dxN = n2X - node.originX;
          const dyN = n2Y - node.originY;
          const distSqN = dxN * dxN + dyN * dyN;
          const distN = Math.sqrt(distSqN);

          if (distN < this.nucleusPos.radius) {
            const pullN = Math.exp(-distSqN / (this.nucleusPos.radius * this.nucleusPos.radius * 0.48));
            const forceN = (this.nucleusPos.mass / (distN + 65)) * pullN;
            targetX += (dxN / (distN || 1)) * forceN;
            targetY += (dyN / (distN || 1)) * forceN;
          }
        }

        // Heavy Cursor Gravity Well (Deep curvature)
        if (this.mouse.hasMoved) {
          const dxM = mx - node.originX;
          const dyM = my - node.originY;
          const distSqM = dxM * dxM + dyM * dyM;
          const distM = Math.sqrt(distSqM);

          if (distM < mRadius) {
            const pullM = Math.exp(-distSqM / (mRadius * mRadius * 0.4));
            const forceM = (mMass / (distM + 45)) * pullM;
            targetX += (dxM / (distM || 1)) * forceM;
            targetY += (dyM / (distM || 1)) * forceM;
          }
        }

        const ax = (targetX - node.x) * springK;
        const ay = (targetY - node.y) * springK;

        node.vx = (node.vx + ax) * damping;
        node.vy = (node.vy + ay) * damping;

        node.x += node.vx;
        node.y += node.vy;
      }
    }

    // =========================================================================
    // 2. RENDER SPACETIME GRID (Fiery Orange & Hot-White subtle illumination)
    // =========================================================================
    ctx.lineWidth = 0.75;

    // Horizontal curves
    for (let r = 0; r < this.rows; r++) {
      ctx.beginPath();
      ctx.moveTo(this.nodes[r][0].x, this.nodes[r][0].y);

      for (let c = 1; c < this.cols; c++) {
        const p0 = this.nodes[r][c - 1];
        const p1 = this.nodes[r][c];
        const xc = (p0.x + p1.x) * 0.5;
        const yc = (p0.y + p1.y) * 0.5;
        ctx.quadraticCurveTo(p0.x, p0.y, xc, yc);
      }
      ctx.lineTo(this.nodes[r][this.cols - 1].x, this.nodes[r][this.cols - 1].y);

      const midNode = this.nodes[r][Math.floor(this.cols * 0.5)];
      const targetFocusX = focusX;
      const targetFocusY = focusY;
      const dCenter = Math.hypot(targetFocusX - midNode.x, targetFocusY - midNode.y);
      const alpha = Math.max(0.045, Math.min(0.23, 0.23 - (dCenter / (focusInfluence * 1.8))));

      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.stroke();
    }

    // Vertical curves
    for (let c = 0; c < this.cols; c++) {
      ctx.beginPath();
      ctx.moveTo(this.nodes[0][c].x, this.nodes[0][c].y);

      for (let r = 1; r < this.rows; r++) {
        const p0 = this.nodes[r - 1][c];
        const p1 = this.nodes[r][c];
        const xc = (p0.x + p1.x) * 0.5;
        const yc = (p0.y + p1.y) * 0.5;
        ctx.quadraticCurveTo(p0.x, p0.y, xc, yc);
      }
      ctx.lineTo(this.nodes[this.rows - 1][c].x, this.nodes[this.rows - 1][c].y);

      const midNode = this.nodes[Math.floor(this.rows * 0.5)][c];
      const targetFocusX = focusX;
      const targetFocusY = focusY;
      const dCenter = Math.hypot(targetFocusX - midNode.x, targetFocusY - midNode.y);
      const alpha = Math.max(0.045, Math.min(0.23, 0.23 - (dCenter / (focusInfluence * 1.8))));

      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.stroke();
    }

    // =========================================================================
    // 3. GRAVITATIONAL LENSING OF STARS
    // =========================================================================
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      let curX = s.baseX;
      let curY = s.baseY;

      const dxFocus = s.baseX - focusX;
      const dyFocus = s.baseY - focusY;
      const distSqFocus = dxFocus * dxFocus + dyFocus * dyFocus;
      const distFocus = Math.sqrt(distSqFocus);

      if (distFocus < focusInfluence * 0.9 && (!this.isPage2Active ? distFocus > br * 0.85 : true)) {
        const lens = (this.isPage2Active ? 4200 : 5400) / (distSqFocus + 300) * Math.exp(-distSqFocus / (focusInfluence * focusInfluence * 0.5));
        curX += (dxFocus / (distFocus || 1)) * lens;
        curY += (dyFocus / (distFocus || 1)) * lens;
      }

      if (!this.isPage2Active && distFocus < br * 0.96) continue; // Eclipsed by black body

      const twinkle = Math.sin(timestamp * 0.001 * s.twinkleSpeed * 100 + s.twinkleOffset);
      const alpha = Math.max(0.06, Math.min(0.8, s.alpha + twinkle * 0.25));

      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(curX, curY, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Render the black body only while the landing page is active.
    if (!this.isPage2Active) {
      
      // =======================================================================
      // 4. UNEVEN, TURBULENT FIERY LIGHT EMISSION (Hot White, Yellow, Fiery Orange)
      // Organic, non-harmonic undulating plasma wave filaments
      // =======================================================================
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'none';

      const timeSec = timestamp * 0.0018;
      const maxReach = br * 2.05;

      // Connected plasma envelopes keep the emission fluid instead of shard-like.
      const waveLayers = [
        { base: 1.6, amplitude: 0.2, color: 'rgba(255, 69, 0, 0.22)' },
        { base: 1.3, amplitude: 0.14, color: 'rgba(255, 69, 0, 0.34)' },
        { base: 1.015, amplitude: 0.035, color: 'rgba(255, 255, 255, 0.48)' }
      ];

      waveLayers.forEach((layer, layerIndex) => {
        ctx.fillStyle = layer.color;
        ctx.beginPath();
        const samples = 32;
        for (let i = 0; i <= samples; i++) {
          const angle = (i / samples) * Math.PI * 2;
          const wave = Math.sin(angle * 2.2 + timeSec * (1.1 + layerIndex * 0.18)) * 0.55
            + Math.cos(angle * 4.7 - timeSec * 0.72) * 0.28
            + Math.sin(angle * 7.3 + timeSec * 0.46) * 0.17
            + Math.sin(angle * 1.15 - timeSec * 0.38) * 0.62;
          const pulse = 1 + Math.sin(timeSec * 1.4 + layerIndex * 0.8) * 0.055;
          const asymmetry = 1 + 0.1 * Math.cos(angle - 1.1 + timeSec * 0.25)
            + 0.055 * Math.sin(angle * 3.1 + 0.7);
          const radius = br * layer.base * pulse * asymmetry * (1 + wave * layer.amplitude);
          const pointX = bx + Math.cos(angle) * radius;
          const pointY = by + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(pointX, pointY);
          else ctx.lineTo(pointX, pointY);
        }
        ctx.closePath();
        ctx.fill();
      });

      // Smooth outer atmospheric blend
      const smoothAura = ctx.createRadialGradient(bx, by, br * 0.9, bx, by, maxReach);
      smoothAura.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      smoothAura.addColorStop(0.2, 'rgba(255, 215, 0, 0.45)');
      smoothAura.addColorStop(0.5, 'rgba(255, 69, 0, 0.22)');
      smoothAura.addColorStop(1, 'rgba(3, 3, 5, 0)');

      ctx.fillStyle = smoothAura;
      ctx.beginPath();
      ctx.arc(bx, by, maxReach, 0, Math.PI * 2);
      ctx.fill();

      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';

      // =======================================================================
      // 5. REVOLVING DEBRIS PARTICLES (Fiery and Hot-White)
      // =======================================================================
      for (let i = 0; i < this.rocks.length; i++) {
        const rock = this.rocks[i];
        rock.angle += rock.speed * (1.0 + this.transitionProgress * 6.0);

        const r = (rock.baseRadius / this.singularity.baseRadius) * br;
        const px = bx + Math.cos(rock.angle) * r;
        const py = by + Math.sin(rock.angle) * (r * 0.48);

        ctx.fillStyle = rock.color;
        ctx.globalAlpha = rock.alpha * (0.6 + Math.sin(rock.angle) * 0.35);

        ctx.beginPath();
        ctx.arc(px, py, rock.size * (br / this.singularity.baseRadius), 0, Math.PI * 2);
        ctx.fill();
      }

      // =======================================================================
      // 6. PROMINENT ORBITING PLANET WITH GLOWING CAPTION
      // =======================================================================
      this.planet.angle += this.planet.speed * (1.0 + this.transitionProgress * 4.0);

      const planetA = (this.planet.orbitA / this.singularity.baseRadius) * br;
      const planetB = (this.planet.orbitB / this.singularity.baseRadius) * br;

      const rawX = Math.cos(this.planet.angle) * planetA;
      const rawY = Math.sin(this.planet.angle) * planetB;

      const rotCos = Math.cos(this.planet.inclination);
      const rotSin = Math.sin(this.planet.inclination);
      const planetX = bx + (rawX * rotCos - rawY * rotSin);
      const planetY = by + (rawX * rotSin + rawY * rotCos);

      // Planet Orbital Trace Line (Fiery Orange/Gold dashed)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 110, 0, 0.32)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(bx, by, planetA, planetB, this.planet.inclination, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Planet Fiery Atmosphere Glow
      const planetGlow = ctx.createRadialGradient(planetX, planetY, 0, planetX, planetY, this.planet.radius * 2.6);
      planetGlow.addColorStop(0, 'rgba(255, 215, 0, 0.7)');
      planetGlow.addColorStop(0.45, 'rgba(255, 69, 0, 0.45)');
      planetGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = planetGlow;
      ctx.beginPath();
      ctx.arc(planetX, planetY, this.planet.radius * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Planet Body (Shaded 3D Sphere illuminated by black body)
      const lightAngle = Math.atan2(by - planetY, bx - planetX);
      const planetBodyGrad = ctx.createRadialGradient(
        planetX + Math.cos(lightAngle) * (this.planet.radius * 0.45),
        planetY + Math.sin(lightAngle) * (this.planet.radius * 0.45),
        1,
        planetX, planetY, this.planet.radius
      );
      planetBodyGrad.addColorStop(0, '#FFFFFF'); // Hot white highlight
      planetBodyGrad.addColorStop(0.35, '#FFD700'); // Bright Yellow
      planetBodyGrad.addColorStop(0.7, '#FF5722'); // Fiery Orange
      planetBodyGrad.addColorStop(1, '#1A0802'); // Deep shadow

      ctx.fillStyle = planetBodyGrad;
      ctx.beginPath();
      ctx.arc(planetX, planetY, this.planet.radius, 0, Math.PI * 2);
      ctx.fill();

      // Planet Razor Rim
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // PROMINENT ORBITING TEXT CAPTION (Hot White with Fiery Orange & Gold Glow)
      const textX = planetX + 16;
      const textY = planetY - 14;

      ctx.font = '600 0.72rem "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FF5722';
      ctx.shadowBlur = 12;
      ctx.fillText(this.planet.caption, textX, textY);
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 6;
      ctx.fillText(this.planet.caption, textX, textY);
      ctx.shadowBlur = 0;

      // Connector line
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(planetX + this.planet.radius, planetY);
      ctx.lineTo(textX - 2, textY - 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // =======================================================================
      // 7. THE DENSE BLACK BODY (PURE ABSOLUTE PITCH-BLACK CORE #000000)
      // =======================================================================
      
      // Organic black silhouette with a slow, uneven atomic wobble.
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      const wobbleTime = timestamp * 0.0012;
      const wobblePoints = 72;
      for (let i = 0; i <= wobblePoints; i++) {
        const angle = (i / wobblePoints) * Math.PI * 2;
        const wobble = 1 + 0.018 * Math.sin(angle * 3 + wobbleTime * 2.1)
          + 0.012 * Math.cos(angle * 7 - wobbleTime * 1.4);
        const radius = br * 0.99 * wobble;
        const pointX = bx + Math.cos(angle) * radius;
        const pointY = by + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(pointX, pointY);
        else ctx.lineTo(pointX, pointY);
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // =========================================================================
    // 8. HEAVY GRAVITATIONAL AURA UNDER CURSOR MASS
    // =========================================================================
    if (this.mouse.hasMoved) {
      const mouseGlow = ctx.createRadialGradient(mx, my, 0, mx, my, mRadius * 0.85);
      mouseGlow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      mouseGlow.addColorStop(0.35, 'rgba(255, 69, 0, 0.06)');
      mouseGlow.addColorStop(0.7, 'rgba(255, 215, 0, 0.02)');
      mouseGlow.addColorStop(1, 'rgba(3, 3, 5, 0)');

      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mx, my, mRadius * 0.85, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(this.animate);
  }
}

// Global Engine Instance
window.spacetimeEngine = new SpacetimeEngine();
window.blackHoleVisual = window.spacetimeEngine;

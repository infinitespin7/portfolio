/**
 * SOUMYADIP SARKAR - MAIN INTERACTION CONTROLLER v3.0
 * Coordinates Typewriter Animation, 3s CTA Delay, Flawless Zero-Flicker Transition,
 * Dynamic Card Spotlight & Instant Click Flip, Radial Orbit Matrix, and Audio HUD.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const pageLanding = document.getElementById('page-landing');
  const pageMain = document.getElementById('page-main');
  const supernovaOverlay = document.getElementById('supernova-overlay');
  const ctaBeacon = document.getElementById('cta-beacon');
  const landingMeta = document.getElementById('landing-meta');

  // Typewriter Elements
  const typewriterText = document.getElementById('typewriter-text');
  const typewriterCursor = document.getElementById('typewriter-cursor');

  // HUD & Audio Elements
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioStatusText = document.getElementById('audio-status');
  const replaySingularityBtn = document.getElementById('replay-singularity-btn');
  const footerRestartBtn = document.getElementById('footer-restart-btn');
  const liveTimeDisplay = document.getElementById('live-time-display');

  // Cards & Orbit
  const statusCards = document.querySelectorAll('.status-card-3d');
  const orbitNodes = document.querySelectorAll('.orbit-node');
  const orbitSpinToggle = document.getElementById('orbit-spin-toggle');
  const orbitSpinText = document.getElementById('orbit-spin-text');
  const centralHub = document.getElementById('central-hub');

  // State Flags
  let isPage1Active = true;
  let isTransitioning = false;
  let typewriterFinished = false;
  let isOrbitSpinning = true;
  let orbitCurrentAngle = 0;

  // Intro text definition
  const introFullText = "Hi, I'm Soumyadip Sarkar, a tech enthusiast and an aspiring ML/AI engineer currently studying in 1st year";

  // =========================================================================
  // 1. TYPEWRITER ANIMATION (Smooth letter-by-letter with 3s CTA beacon delay)
  // =========================================================================
  function runTypewriter() {
    const nameText = 'Soumyadip Sarkar';
    const roleText = 'ML/AI engineer';
    const nameStart = introFullText.indexOf(nameText);
    const roleStart = introFullText.indexOf(roleText);
    const beforeName = document.createTextNode('');
    const nameNode = document.createElement('span');
    const betweenNameAndRole = document.createTextNode('');
    const roleNode = document.createElement('span');
    const afterRole = document.createTextNode('');

    nameNode.className = 'highlight-name';
    roleNode.className = 'highlight-role';
    typewriterText.replaceChildren(beforeName, nameNode, betweenNameAndRole, roleNode, afterRole);

    let charIndex = 0;
    const typingSpeed = 32; // ms per char

    function typeNextChar() {
      if (charIndex < introFullText.length) {
        const char = introFullText[charIndex];
        
        if (window.cosmicAudio && char !== ' ' && charIndex % 3 === 0) {
          window.cosmicAudio.playTypewriterClick();
        }

        charIndex++;
        beforeName.textContent = introFullText.slice(0, Math.min(charIndex, nameStart));
        nameNode.textContent = introFullText.slice(nameStart, Math.min(charIndex, nameStart + nameText.length));
        betweenNameAndRole.textContent = introFullText.slice(nameStart + nameText.length, Math.min(charIndex, roleStart));
        roleNode.textContent = introFullText.slice(roleStart, Math.min(charIndex, roleStart + roleText.length));
        afterRole.textContent = introFullText.slice(roleStart + roleText.length, charIndex);

        const delay = (char === ',' || char === '.') ? typingSpeed * 4.5 : typingSpeed + (Math.random() * 12 - 6);
        setTimeout(typeNextChar, delay);
      } else {
        typewriterFinished = true;
        
        if (landingMeta) {
          landingMeta.classList.add('visible');
        }

        // SPEC REQUIREMENT: Exactly 3 seconds after typewriter effect finishes,
        // render glowing top-centered text reading: "click anywhere to proceed"
        setTimeout(() => {
          if (isPage1Active && ctaBeacon) {
            ctaBeacon.classList.add('visible');
            if (window.cosmicAudio) {
              window.cosmicAudio.playChime(659.25, 0.4);
            }
          }
        }, 3000);
      }
    }

    setTimeout(typeNextChar, 500);
  }

  // =========================================================================
  // 2. FLAWLESS ZERO-FLICKER GRAVITATIONAL TRANSITION (Page 1 -> Page 2)
  // =========================================================================
  function executeEngulfTransition() {
    if (!isPage1Active || isTransitioning) return;
    isTransitioning = true;

    if (window.cosmicAudio) {
      window.cosmicAudio.init();
      window.cosmicAudio.playSupernovaBoom();
    }

    if (ctaBeacon) {
      ctaBeacon.classList.remove('visible');
    }

    // Activate smooth cinematic transition overlay
    if (supernovaOverlay) {
      supernovaOverlay.classList.add('active');
    }

    if (window.spacetimeEngine && typeof window.spacetimeEngine.triggerEngulfTransition === 'function') {
      window.spacetimeEngine.triggerEngulfTransition(
        // Callback 1: On Peak Opacity (Swap DOM behind the opaque cover)
        () => {
          pageLanding.classList.remove('active');
          pageLanding.classList.add('hidden');
          pageMain.classList.remove('hidden');
          pageMain.classList.add('active');
          document.body.classList.add('page-two-active');

          if (window.spacetimeEngine) {
            window.spacetimeEngine.setPage2Active(true);
          }

          if (replaySingularityBtn) {
            replaySingularityBtn.classList.remove('hidden');
          }

          window.scrollTo({ top: 0, behavior: 'instant' });
        },
        // Callback 2: On Transition Finish (Overlay fades away cleanly)
        () => {
          if (supernovaOverlay) {
            supernovaOverlay.classList.remove('active');
          }
          isPage1Active = false;
          isTransitioning = false;
        }
      );
    } else {
      setTimeout(() => {
        pageLanding.classList.remove('active');
        pageLanding.classList.add('hidden');
        pageMain.classList.remove('hidden');
        pageMain.classList.add('active');
        document.body.classList.add('page-two-active');
        if (window.spacetimeEngine) {
          window.spacetimeEngine.setPage2Active(true);
        }
        if (replaySingularityBtn) replaySingularityBtn.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (supernovaOverlay) supernovaOverlay.classList.remove('active');
        isPage1Active = false;
        isTransitioning = false;
      }, 1400);
    }
  }

  // Bind click & touch anywhere on Page 1 to trigger transition
  pageLanding.addEventListener('click', (e) => {
    if (e.target.closest('#audio-toggle-btn')) return;
    executeEngulfTransition();
  });

  pageLanding.addEventListener('touchend', (e) => {
    if (e.target.closest('#audio-toggle-btn')) return;
    executeEngulfTransition();
  }, { passive: true });

  // =========================================================================
  // 3. REVISIT SINGULARITY LANDING PAGE
  // =========================================================================
  function returnToLanding() {
    if (isPage1Active || isTransitioning) return;
    isTransitioning = true;

    if (window.cosmicAudio) {
      window.cosmicAudio.playChime(440, 0.3);
    }

    if (window.spacetimeEngine) {
      window.spacetimeEngine.setPage2Active(false);
      window.spacetimeEngine.resetExpansion();
    }

    pageMain.classList.remove('active');
    document.body.classList.remove('page-two-active');
    pageMain.classList.add('hidden');
    pageLanding.classList.remove('hidden');
    pageLanding.classList.add('active');

    if (replaySingularityBtn) {
      replaySingularityBtn.classList.add('hidden');
    }

    isPage1Active = true;
    isTransitioning = false;

    if (ctaBeacon) {
      ctaBeacon.classList.remove('visible');
      setTimeout(() => {
        if (isPage1Active) {
          ctaBeacon.classList.add('visible');
        }
      }, 1000);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (replaySingularityBtn) replaySingularityBtn.addEventListener('click', returnToLanding);
  if (footerRestartBtn) footerRestartBtn.addEventListener('click', returnToLanding);

  // =========================================================================
  // 4. STATUS CARDS: DYNAMIC SPOTLIGHT & INSTANT CLICK FLIP FIX
  // =========================================================================
  statusCards.forEach((card) => {
    // Dynamic Mouse Spotlight Calculation
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D perspective tilt on desktop
      if (window.innerWidth >= 1024 && !card.classList.contains('flipped')) {
        const rotateX = (-(y - rect.height * 0.5) / (rect.height * 0.5)) * 6;
        const rotateY = ((x - rect.width * 0.5) / (rect.width * 0.5)) * 6;
        const inner = card.querySelector('.card-inner');
        if (inner) {
          inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      }
    });

    card.addEventListener('mouseleave', () => {
      const inner = card.querySelector('.card-inner');
      if (inner && !card.classList.contains('flipped')) {
        inner.style.transform = '';
      }
    });

    // Instant Click & Tap Handler
    function toggleCardFlip(e) {
      e.stopPropagation();
      card.classList.toggle('flipped');
      const isFlipped = card.classList.contains('flipped');
      card.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');

      const inner = card.querySelector('.card-inner');
      if (inner) {
        inner.style.transform = isFlipped ? 'rotateY(180deg)' : '';
      }

      if (window.cosmicAudio) {
        window.cosmicAudio.playCardFlip();
      }
    }

    card.addEventListener('click', toggleCardFlip);

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCardFlip(e);
      }
    });
  });

  // =========================================================================
  // 5. ABOUT ME SECTION (Radial Orbital Architecture)
  // =========================================================================
  function updateOrbitPositions() {
    if (window.innerWidth >= 1024 && isOrbitSpinning) {
      orbitCurrentAngle += 0.0025; // Continuous celestial rotation

      const radius = 240;
      orbitNodes.forEach((node, index) => {
        const baseAngle = (index * (Math.PI / 2)) - (Math.PI / 2);
        const currentTotalAngle = baseAngle + orbitCurrentAngle;

        const offsetX = Math.cos(currentTotalAngle) * radius;
        const offsetY = Math.sin(currentTotalAngle) * radius;

        node.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
      });
    }

    requestAnimationFrame(updateOrbitPositions);
  }

  updateOrbitPositions();

  if (orbitSpinToggle) {
    orbitSpinToggle.addEventListener('click', () => {
      isOrbitSpinning = !isOrbitSpinning;
      orbitSpinText.textContent = isOrbitSpinning ? "ORBIT: ACTIVE" : "ORBIT: PAUSED";
      if (window.cosmicAudio) {
        window.cosmicAudio.playChime(isOrbitSpinning ? 600 : 350, 0.2);
      }
    });
  }

  if (centralHub) {
    centralHub.addEventListener('click', () => {
      if (window.cosmicAudio) {
        window.cosmicAudio.playChime(784, 0.35);
      }
    });
  }

  // =========================================================================
  // 6. AUDIO HUD CONTROLS
  // =========================================================================
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.cosmicAudio) {
        const isNowOn = window.cosmicAudio.toggle();
        if (isNowOn) {
          audioToggleBtn.classList.add('active');
          audioStatusText.textContent = 'ON';
        } else {
          audioToggleBtn.classList.remove('active');
          audioStatusText.textContent = 'OFF';
        }
      }
    });
  }

  // =========================================================================
  // 7. LIVE UTC TELEMETRY CLOCK
  // =========================================================================
  function updateTelemetry() {
    if (!liveTimeDisplay) return;
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSecs = String(now.getUTCSeconds()).padStart(2, '0');
    liveTimeDisplay.textContent = `UTC ${utcHours}:${utcMins}:${utcSecs} // SINGULARITY_ONLINE`;
  }
  setInterval(updateTelemetry, 1000);
  updateTelemetry();

  // Run Typewriter
  runTypewriter();
});

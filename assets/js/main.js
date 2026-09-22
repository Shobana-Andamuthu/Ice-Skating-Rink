/* ==========================================================================
   FROSTIVA — MAIN JAVASCRIPT
   Vanilla JS only: Theme, Direction, Navigation, Tabs, Dashboard
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initMobileMenu();
  initNavHighlighting();
  initBackToTop();
  initAuthForms();
  initScheduleTabs();
  initDashboardTabs();
  initSoundscapeConsole();
  initArrivalSteps();
  initSkillPathwayTabs();
  initPricingCalculator();
});

/* --- THEME TOGGLE (LIGHT / DARK) --- */
function initTheme() {
  const savedTheme = localStorage.getItem('frostiva_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('frostiva_theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle-btn i');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* --- LTR / RTL TOGGLE --- */
function initDirection() {
  const savedDir = localStorage.getItem('frostiva_dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateRtlButtonText(savedDir);

  const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
  rtlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('frostiva_dir', newDir);
      updateRtlButtonText(newDir);
    });
  });
}

function updateRtlButtonText(dir) {
  const rtlLabels = document.querySelectorAll('.rtl-toggle-btn span');
  rtlLabels.forEach(label => {
    label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* --- MOBILE MENU --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-btn');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const dropdownHeaders = document.querySelectorAll('.mobile-dropdown-header');
  const dropdownMenus = document.querySelectorAll('.mobile-dropdown-menu');

  const closeAllDropdowns = () => {
    dropdownHeaders.forEach(hdr => hdr.classList.remove('open'));
    dropdownMenus.forEach(menu => menu.classList.remove('show'));
  };

  const openMobileMenu = () => {
    closeAllDropdowns();
    if (overlay) overlay.classList.add('active');
    document.documentElement.classList.add('mobile-menu-open');
    document.body.classList.add('mobile-menu-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (overlay) overlay.classList.remove('active');
    document.documentElement.classList.remove('mobile-menu-open');
    document.body.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';
    closeAllDropdowns();
  };

  if (hamburger) {
    hamburger.addEventListener('click', openMobileMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeMobileMenu();
      }
    });

    // Prevent background touch scrolling when touch occurs on the backdrop
    overlay.addEventListener('touchmove', (e) => {
      if (e.target === overlay) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Mobile Dropdown Accordion Toggle
  dropdownHeaders.forEach(hdr => {
    hdr.addEventListener('click', () => {
      const parent = hdr.closest('.mobile-dropdown');
      const menu = parent ? parent.querySelector('.mobile-dropdown-menu') : null;
      if (menu) {
        const isOpen = menu.classList.contains('show');
        if (isOpen) {
          menu.classList.remove('show');
          hdr.classList.remove('open');
        } else {
          menu.classList.add('show');
          hdr.classList.add('open');
        }
      }
    });
  });

  // Close mobile drawer when clicking navigation links
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

/* --- DYNAMIC NAV & HOME MENU HIGHLIGHTING --- */
function initNavHighlighting() {
  const currentPath = (window.location.pathname || '').toLowerCase();
  const isHome = currentPath.endsWith('index.html') || currentPath.endsWith('home2.html') || currentPath.endsWith('/') || currentPath === '';
  
  if (isHome) {
    const desktopHomeToggle = document.querySelector('.nav-dropdown > .nav-link');
    if (desktopHomeToggle) desktopHomeToggle.classList.add('active');
    
    const mobileHomeHeader = document.querySelector('.mobile-dropdown-header');
    if (mobileHomeHeader) mobileHomeHeader.classList.add('active');
  }
}

/* --- BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- AUTH PAGE TABS & PASSWORD TOGGLE --- */
function initAuthForms() {
  const loginTab = document.getElementById('loginTabBtn');
  const registerTab = document.getElementById('registerTabBtn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginTab && registerTab && loginForm && registerForm) {
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
    });
  }

  const passToggles = document.querySelectorAll('.password-toggle-btn');
  passToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      const icon = toggle.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
      }
    });
  });
}

/* --- SESSIONS SCHEDULE FILTER TABS --- */
function initScheduleTabs() {
  const pills = document.querySelectorAll('.filter-pill');
  const slots = document.querySelectorAll('.slot-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      const filter = pill.getAttribute('data-day');
      slots.forEach(slot => {
        if (filter === 'all' || slot.getAttribute('data-day') === filter) {
          slot.style.display = 'flex';
        } else {
          slot.style.display = 'none';
        }
      });
    });
  });
}

/* --- DASHBOARD TAB SWITCHER --- */
function initDashboardTabs() {
  const navItems = document.querySelectorAll('.dash-nav-item');
  const views = document.querySelectorAll('.dash-view-content');
  const pageTitle = document.getElementById('dashCurrentTitle');

  if (!navItems.length || !views.length) return;

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      const viewTitle = item.getAttribute('data-title');

      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      views.forEach(view => {
        if (view.id === targetView) {
          view.style.display = 'block';
        } else {
          view.style.display = 'none';
        }
      });

      if (pageTitle && viewTitle) {
        pageTitle.textContent = viewTitle;
      }
    });
  });
}

/* --- SOUNDSCAPE STUDIO CONSOLE CONTROLLER --- */
function initSoundscapeConsole() {
  const channelItems = document.querySelectorAll('.sound-channel-item');
  const masterPlayBtn = document.getElementById('masterPlayBtn');
  const masterPlayIcon = document.getElementById('masterPlayIcon');
  const vinylGlow = document.getElementById('vinylGlow');
  const deckTitle = document.getElementById('deckTitle');
  const deckGenreTag = document.getElementById('deckGenreTag');
  const deckBpmTag = document.getElementById('deckBpmTag');
  const deckLightingTag = document.getElementById('deckLightingTag');
  const deckDesc = document.getElementById('deckDesc');
  const deckSchedule = document.getElementById('deckSchedule');
  const deckCenterIcon = document.getElementById('deckCenterIcon');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const deckProgressBar = document.getElementById('deckProgressBar');
  const deckProgressFill = document.getElementById('deckProgressFill');
  const timeCurrent = document.getElementById('timeCurrent');

  if (!channelItems.length) return;

  let currentChannelIndex = 0;
  let isPlaying = true;
  let playbackInterval = null;
  let currentSeconds = 108; // 01:48
  const totalSeconds = 225; // 03:45

  function updateDeck(index) {
    currentChannelIndex = index;
    channelItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    const activeItem = channelItems[index];
    if (!activeItem) return;

    if (deckTitle) deckTitle.textContent = activeItem.getAttribute('data-title');
    if (deckGenreTag) deckGenreTag.textContent = activeItem.getAttribute('data-genre');
    if (deckBpmTag) deckBpmTag.innerHTML = `<i class="fas fa-heartbeat"></i> ${activeItem.getAttribute('data-bpm')}`;
    if (deckLightingTag) deckLightingTag.innerHTML = `<i class="fas fa-bolt"></i> ${activeItem.getAttribute('data-lighting')}`;
    if (deckDesc) deckDesc.textContent = activeItem.getAttribute('data-desc');
    if (deckSchedule) deckSchedule.textContent = activeItem.getAttribute('data-schedule');
    if (deckCenterIcon) deckCenterIcon.className = activeItem.getAttribute('data-icon');

    // Reset progress
    currentSeconds = 15;
    updateProgressUI();
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (vinylGlow) {
      vinylGlow.classList.toggle('playing', isPlaying);
    }
    if (masterPlayIcon) {
      masterPlayIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
  }

  function updateProgressUI() {
    if (deckProgressFill) {
      const pct = (currentSeconds / totalSeconds) * 100;
      deckProgressFill.style.width = `${pct}%`;
    }
    if (timeCurrent) {
      const mins = Math.floor(currentSeconds / 60);
      const secs = currentSeconds % 60;
      timeCurrent.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }

  // Playback timer simulation
  playbackInterval = setInterval(() => {
    if (isPlaying) {
      currentSeconds = (currentSeconds + 1) % totalSeconds;
      updateProgressUI();
    }
  }, 1000);

  // Set initial playing state
  if (vinylGlow) vinylGlow.classList.add('playing');
  if (masterPlayIcon) masterPlayIcon.className = 'fas fa-pause';

  // Attach channel click
  channelItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      updateDeck(index);
      if (!isPlaying) togglePlay();
    });
  });

  // Play Button
  if (masterPlayBtn) {
    masterPlayBtn.addEventListener('click', togglePlay);
  }

  // Prev / Next
  if (prevTrackBtn) {
    prevTrackBtn.addEventListener('click', () => {
      const newIdx = (currentChannelIndex - 1 + channelItems.length) % channelItems.length;
      updateDeck(newIdx);
    });
  }

  if (nextTrackBtn) {
    nextTrackBtn.addEventListener('click', () => {
      const newIdx = (currentChannelIndex + 1) % channelItems.length;
      updateDeck(newIdx);
    });
  }

  // Progress Bar click
  // Progress Bar click
  if (deckProgressBar) {
    deckProgressBar.addEventListener('click', (e) => {
      const rect = deckProgressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      currentSeconds = Math.floor(pct * totalSeconds);
      updateProgressUI();
    });
  }
}

/* --- ARRIVAL STEPS INTERACTIVE HIGHLIGHT --- */
function initArrivalSteps() {
  const stepCards = document.querySelectorAll('.arrival-step-card');
  if (!stepCards.length) return;

  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* --- SKILL PATHWAY & PROGRESSION MATRIX TABS --- */
function initSkillPathwayTabs() {
  const pathwayBtns = document.querySelectorAll('.pathway-tab-btn');
  const hudBadge = document.getElementById('hudBadge');
  const hudDuration = document.getElementById('hudDuration');
  const hudTitle = document.getElementById('hudTitle');
  const hudDesc = document.getElementById('hudDesc');
  const m1Val = document.getElementById('m1Val');
  const m1Fill = document.getElementById('m1Fill');
  const m2Val = document.getElementById('m2Val');
  const m2Fill = document.getElementById('m2Fill');
  const m3Val = document.getElementById('m3Val');
  const m3Fill = document.getElementById('m3Fill');
  const hudCert = document.getElementById('hudCert');
  const drillsList = document.getElementById('drillsList');

  if (!pathwayBtns.length || !drillsList) return;

  const pathwayData = {
    '1': {
      badge: 'Tier 1 • Beginner',
      duration: '6 – 8 Weeks',
      title: 'Glacier Cadet Level',
      desc: 'Mastering confidence on the ice, posture alignment, forward stroking, snowplow stops, and recovery fundamentals.',
      m1: '90%', m2: '65%', m3: '50%',
      cert: 'USFS Basic 1–3 Badge',
      drills: [
        { num: '01', title: 'March & Two-Foot Glide', desc: 'Forward marching steps across rink width transitioning into an extended balanced glide.', tag: 'Essential Prerequisite' },
        { num: '02', title: 'Dip & Safe Fall Recovery', desc: 'Deep knee bend squat on moving ice and proper hand-tuck fall recovery technique.', tag: 'Safety Standard' },
        { num: '03', title: 'Forward Swizzles (Fishies)', desc: 'Inward and outward blade pushes maintaining rhythm, continuous knee flex, and edge push.', tag: 'Core Motion' },
        { num: '04', title: 'Snowplow Stop & T-Stop', desc: 'Controlled deceleration applying blade friction with heels pushed out and shoulders squared.', tag: 'Level Test Goal' }
      ]
    },
    '2': {
      badge: 'Tier 2 • Intermediate',
      duration: '8 – 10 Weeks',
      title: 'Frost Stride Level',
      desc: 'Mastering backward gliding, inside/outside consecutive edges, forward crossovers with continuous lean, and one-foot glide control.',
      m1: '95%', m2: '80%', m3: '75%',
      cert: 'USFS Basic 4–6 Badge',
      drills: [
        { num: '01', title: 'Backward C-Cuts & Glides', desc: 'Pushing backward alternating feet with stable upright posture and back blade control.', tag: 'Motion Control' },
        { num: '02', title: 'Forward Crossovers (L & R)', desc: 'High circular cross-steps entering curve arcs with clean inside/outside edge hold.', tag: 'Speed & Power' },
        { num: '03', title: 'One-Foot Glide & Spiral Prep', desc: 'Sustaining forward balance on a single blade for 3 rink seconds with torso extension.', tag: 'Balance Core' },
        { num: '04', title: 'Mohawk & 3-Turn Transitions', desc: 'Front-to-back body rotational edge turns along continuous half-circle arcs.', tag: 'Agility Test' }
      ]
    },
    '3': {
      badge: 'Tier 3 • Advanced',
      duration: '10 – 12 Weeks',
      title: 'Edge Master Level',
      desc: 'Advanced rotational physics, upright scratch spins, sit spins, waltz jump, Salchow, and toe-loop jump foundations.',
      m1: '98%', m2: '92%', m3: '88%',
      cert: 'USFS Pre-Bronze & Bronze',
      drills: [
        { num: '01', title: 'Upright Scratch Spin (5+ Revs)', desc: 'Centered one-foot pivot with accelerating rotational torque and crisp leg cross.', tag: 'Spin Mastery' },
        { num: '02', title: 'Waltz Jump & Toe Loop', desc: '180° airborne jump from forward outside edge landing cleanly on backward outside edge.', tag: 'Jump Foundation' },
        { num: '03', title: 'Backward Crossovers with Power', desc: 'High-speed perimeter pumping generating maximum velocity for jump approaches.', tag: 'Power Track' },
        { num: '04', title: 'Sit Spin & Camel Entry', desc: 'Deep knee bend spin position maintaining blade center for minimum 4 rotations.', tag: 'Advanced Figure' }
      ]
    },
    '4': {
      badge: 'Tier 4 • Olympic Track',
      duration: '12+ Weeks (Year-Round)',
      title: 'Olympic Track Level',
      desc: 'High-performance competitive figure skating with double/triple axels, complex footwork sequences, and ISU choreography.',
      m1: '99%', m2: '98%', m3: '96%',
      cert: 'ISU Senior / USFS Gold Medal',
      drills: [
        { num: '01', title: 'Double Axel & Triple Salchow', desc: 'Multi-revolution airborne rotation with high vertical explosion and secure check-out.', tag: 'Elite Jump' },
        { num: '02', title: 'Flying Camel & Change Spin', desc: 'Aerodynamic jump into camel spin transitioning into illusion and pancake variations.', tag: 'Master Spin' },
        { num: '03', title: 'Starlight Step Sequence', desc: 'Level 4 complex turns (twizzles, rockers, counters, brackets) on continuous deep edges.', tag: 'Choreography' },
        { num: '04', title: 'Free Skate Competitive Routine', desc: 'Full 3:30 minute program set to music featuring planned jump/spin combinations.', tag: 'Podium Ready' }
      ]
    }
  };

  pathwayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pathwayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const level = btn.getAttribute('data-level');
      const data = pathwayData[level];
      if (!data) return;

      if (hudBadge) hudBadge.textContent = data.badge;
      if (hudDuration) hudDuration.textContent = data.duration;
      if (hudTitle) hudTitle.textContent = data.title;
      if (hudDesc) hudDesc.textContent = data.desc;
      if (m1Val) m1Val.textContent = data.m1;
      if (m1Fill) m1Fill.style.width = data.m1;
      if (m2Val) m2Val.textContent = data.m2;
      if (m2Fill) m2Fill.style.width = data.m2;
      if (m3Val) m3Val.textContent = data.m3;
      if (m3Fill) m3Fill.style.width = data.m3;
      if (hudCert) hudCert.textContent = data.cert;

      // Re-render drills
      drillsList.innerHTML = data.drills.map(drill => `
        <div class="drill-card">
          <div class="drill-num">${drill.num}</div>
          <div class="drill-body">
            <h4>${drill.title}</h4>
            <p>${drill.desc}</p>
            <span class="drill-tag"><i class="fas fa-check-circle"></i> ${drill.tag}</span>
          </div>
        </div>
      `).join('');
    });
  });
}

/* --- PASS COST & SAVINGS CALCULATOR --- */
function initPricingCalculator() {
  const visitsSlider = document.getElementById('visitsSlider');
  const visitsDisplay = document.getElementById('visitsDisplay');
  const calcSkateRental = document.getElementById('calcSkateRental');
  const calcSharpening = document.getElementById('calcSharpening');
  const paygoCost = document.getElementById('paygoCost');
  const recPlanTag = document.getElementById('recPlanTag');
  const recPlanName = document.getElementById('recPlanName');
  const recPlanPrice = document.getElementById('recPlanPrice');
  const recPlanDesc = document.getElementById('recPlanDesc');
  const monthlySavingsVal = document.getElementById('monthlySavingsVal');
  const annualSavingsVal = document.getElementById('annualSavingsVal');

  if (!visitsSlider || !paygoCost) return;

  function calculateSavings() {
    const visits = parseInt(visitsSlider.value, 10);
    const needRental = calcSkateRental ? calcSkateRental.checked : true;
    const needSharpening = calcSharpening ? calcSharpening.checked : false;

    if (visitsDisplay) {
      visitsDisplay.textContent = `${visits} visit${visits > 1 ? 's' : ''} / mo`;
    }

    const singleTicket = 16;
    const rentalFee = needRental ? 5 : 0;
    const sharpeningFee = needSharpening ? 12 : 0;
    const paygoTotal = (visits * (singleTicket + rentalFee)) + sharpeningFee;

    let recCost = 89;
    let planTitle = 'Arctic Unlimited Pass';
    let planSub = '$89 <small>/ month</small>';
    let planDescText = 'Includes 100% unlimited admissions and FREE skate rentals on every visit.';
    let tagText = 'Best Value Choice';

    if (visits <= 2) {
      recCost = (visits * 13) + (needRental ? visits * 5 : 0);
      planTitle = '10-Session Punch Pass';
      planSub = '$130 <small>one-time ($13/session)</small>';
      planDescText = '10 flexible entries with no expiration date. Perfect for light casual skating.';
      tagText = 'Flexible Option';
    } else {
      recCost = 89 + (needSharpening ? 12 : 0);
      planTitle = 'Arctic Unlimited Pass';
      planSub = '$89 <small>/ month</small>';
      planDescText = 'Includes 100% unlimited admissions and FREE skate rentals on every visit.';
      tagText = 'Maximum Savings Choice';
    }

    let monthlySavings = Math.max(12, paygoTotal - recCost);
    if (visits <= 2) {
      monthlySavings = visits * 3; // $3 cheaper per session than standard paygo
    }

    if (paygoCost) paygoCost.textContent = `$${paygoTotal} / mo`;
    if (recPlanTag) recPlanTag.textContent = tagText;
    if (recPlanName) recPlanName.textContent = planTitle;
    if (recPlanPrice) recPlanPrice.innerHTML = planSub;
    if (recPlanDesc) recPlanDesc.textContent = planDescText;
    if (monthlySavingsVal) monthlySavingsVal.textContent = `$${monthlySavings} / month`;
    if (annualSavingsVal) annualSavingsVal.textContent = `That's $${monthlySavings * 12} saved per year!`;
  }

  visitsSlider.addEventListener('input', calculateSavings);
  if (calcSkateRental) calcSkateRental.addEventListener('change', calculateSavings);
  if (calcSharpening) calcSharpening.addEventListener('change', calculateSavings);

  calculateSavings();
}




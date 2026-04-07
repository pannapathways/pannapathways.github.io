document.addEventListener('DOMContentLoaded', function() {
  // ===== HAMBURGER MENU - FIXED VERSION WITH PROPER NAVIGATION =====
  function initHamburgerMenu() {
    // Remove existing hamburger button if any to avoid duplicates
    const existingHamburger = document.querySelector('.hamburger-btn');
    if (existingHamburger) {
      existingHamburger.remove();
    }
    
    const headerContent = document.querySelector('.header-content');
    const nav = document.querySelector('nav');
    
    // Check if we're on mobile (width <= 768px)
    const isMobile = () => window.innerWidth <= 768;
    
    if (!headerContent || !nav) return;
    
    // Only create hamburger button if we're on mobile
    if (isMobile() && !document.querySelector('.hamburger-btn')) {
      const hamburger = document.createElement('div');
      hamburger.className = 'hamburger-btn';
      hamburger.setAttribute('aria-label', 'Menu');
      hamburger.setAttribute('role', 'button');
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      
      // Insert hamburger button
      headerContent.appendChild(hamburger);
      
      // Toggle menu function
      const toggleMenu = (e) => {
        if (e) e.stopPropagation();
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      };
      
      // Add click event to hamburger button
      hamburger.addEventListener('click', toggleMenu);
      
      // Close menu when clicking on a link - BUT DON'T PREVENT DEFAULT NAVIGATION
      const navLinks = document.querySelectorAll('.nav-list a');
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Just close the menu, don't interfere with navigation
          hamburger.classList.remove('active');
          nav.classList.remove('active');
          document.body.classList.remove('menu-open');
          // Allow the link to navigate normally
        });
      });
      
      // Close menu when clicking outside (but not on links)
      document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !hamburger.contains(event.target)) {
          hamburger.classList.remove('active');
          nav.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
      
      // Prevent clicks inside nav from closing the menu
      nav.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
    
    // Handle window resize
    function handleResize() {
      const hamburger = document.querySelector('.hamburger-btn');
      if (window.innerWidth > 768) {
        if (hamburger) {
          hamburger.classList.remove('active');
        }
        if (nav) {
          nav.classList.remove('active');
        }
        document.body.classList.remove('menu-open');
      } else {
        // If we're on mobile and hamburger doesn't exist, reinitialize
        if (!document.querySelector('.hamburger-btn')) {
          initHamburgerMenu();
        }
      }
    }
    
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
  }
  
  // Initialize hamburger menu
  initHamburgerMenu();
  
  // Re-initialize on page load (for when page is loaded from cache)
  window.addEventListener('load', initHamburgerMenu);
  
  // Also re-initialize when page becomes visible (for mobile back/forward navigation)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      setTimeout(initHamburgerMenu, 100);
    }
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // ===== STICKY HEADER SHADOW =====
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 6px 18px rgba(0,0,0,0.05)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS (only for internal page links) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== CONTACT FORM VALIDATION - REMOVED POPUP ALERT =====
  // The form is now handled by the inline script in contact.html
  // This prevents duplicate form handling
});s

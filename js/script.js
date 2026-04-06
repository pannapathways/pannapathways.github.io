document.addEventListener('DOMContentLoaded', function() {
  // ===== HAMBURGER MENU =====
  const createHamburgerMenu = () => {
    // Check if hamburger button already exists
    if (document.querySelector('.hamburger-btn')) return;
    
    const nav = document.querySelector('nav');
    const navList = document.querySelector('.nav-list');
    
    if (!nav || !navList) return;
    
    // Create hamburger button
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger-btn';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Insert hamburger button before nav
    nav.parentNode.insertBefore(hamburger, nav);
    
    // Add classes for mobile styling
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !hamburger.contains(event.target) && nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
    
    // Handle window resize - reset menu if screen becomes larger
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  };
  
  // Initialize hamburger menu
  createHamburgerMenu();

  // Scroll reveal
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

  // Sticky header shadow
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

  // Smooth scroll for anchor links
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

  // Contact form validation
  const contactForm = document.getElementById('registrationForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      
      let isValid = true;
      
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        showError(name, 'Full name is required');
        isValid = false;
      }
      
      const email = document.getElementById('email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        showError(email, 'Enter a valid email address');
        isValid = false;
      }
      
      const phone = document.getElementById('phone');
      const phonePattern = /^[0-9]{10}$/;
      if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
      } else if (!phonePattern.test(phone.value.trim())) {
        showError(phone, 'Enter a 10-digit mobile number');
        isValid = false;
      }
      
      const service = document.getElementById('service');
      if (!service.value) {
        showError(service, 'Please select a service');
        isValid = false;
      }
      
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        showError(message, 'Message cannot be blank');
        isValid = false;
      }
      
      if (isValid) {
        alert('Thank you! Your enquiry has been sent. We will contact you soon.');
        contactForm.reset();
      }
    });

    function showError(input, text) {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = text;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
  }
});
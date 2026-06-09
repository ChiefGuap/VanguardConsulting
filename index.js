/**
 * Vanguard Consulting - Interactive Behaviors
 * Includes: Scroll Reveal, Dynamic Header, Mobile Navigation, and FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeaderScroll();
  initMobileMenu();
  initFaqAccordion();
});

/**
 * 1. Scroll Reveal Observer
 * Uses IntersectionObserver to reveal elements when scrolled into view
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -10% 0px', // trigger slightly before entering fully
      threshold: 0.1 // 10% visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after showing to make it a one-time fade up
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/**
 * 2. Header Scroll Effect
 * Adds a blurred backdrop background when page is scrolled down
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  // Initial check
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 3. Mobile Hamburger Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-overlay .nav-link');
  
  if (!menuToggle || !mobileOverlay) return;
  
  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Prevent scrolling behind overlay when open
    if (mobileOverlay.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  menuToggle.addEventListener('click', toggleMenu);
  
  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileOverlay.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/**
 * 4. FAQ Accordion Toggle
 */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all other FAQ items for a clean accordion behavior
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // If the clicked one wasn't active, open it
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}

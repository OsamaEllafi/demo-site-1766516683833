// Libyan Elite University Training Center - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVIGATION ====================
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Sticky Navbar on Scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow/blur effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/Hide Scroll to Top Button
        if (currentScroll > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // Scroll to Top Functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ==================== PROGRAM FILTERING ====================

    const programFilterBtns = document.querySelectorAll('.filter-container .filter-btn');
    const programCards = document.querySelectorAll('.program-card');

    programFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            programFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            programCards.forEach(card => {
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = '';
                
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ==================== SCHEDULE FILTERING ====================

    const scheduleFilterBtns = document.querySelectorAll('.schedule-filters .filter-btn');
    const scheduleItems = document.querySelectorAll('.schedule-item');

    scheduleFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            scheduleFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-schedule');
            
            scheduleItems.forEach(item => {
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = '';
                
                if (filter === 'all' || item.getAttribute('data-type') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ==================== FAQ ACCORDION ====================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // ==================== STAGGERED ANIMATIONS FOR LISTS ====================

    // Apply staggered delays to program cards when they appear
    function applyStaggeredAnimation(elements) {
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Initial stagger for visible program cards
    applyStaggeredAnimation(programCards);

    // Re-apply when filters change
    programFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                const visibleCards = Array.from(programCards).filter(
                    card => card.style.display !== 'none'
                );
                applyStaggeredAnimation(visibleCards);
            }, 10);
        });
    });

    // ==================== PARALLAX EFFECT ON SCROLL (Subtle) ====================

    const heroContent = document.querySelector('.hero-content');
    const gradientBlobs = document.querySelectorAll('.gradient-blob');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        if (scrollY < window.innerHeight) {
            // Subtle parallax for hero content
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
            
            // Move gradient blobs at different speeds
            gradientBlobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.5;
                blob.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
    });

    // ==================== HOVER SOUND EFFECTS (Optional - Remove if undesired) ====================
    // Commented out to avoid auto-play issues and performance
    /*
    const interactiveElements = document.querySelectorAll('button, a, .program-card, .testimonial-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Subtle audio feedback could be added here
            console.log('Hover:', el.textContent.substring(0, 20));
        });
    });
    */

    // ==================== FORM VALIDATION (Contact Section - Enhancement) ====================

    // Add real-time validation for email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.getAttribute('href').replace('mailto:', '');
            console.log(`Email clicked: ${email}`);
            // Could add analytics tracking here
        });
    });

    // ==================== KEYBOARD NAVIGATION ENHANCEMENTS ====================

    // Trap focus in mobile menu when open
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }

    // Apply trap focus when mobile menu is open
    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            trapFocus(navMenu);
            // Focus first link
            const firstLink = navMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        }
    });

    // ==================== PERFORMANCE: LAZY LOADING SIMULATION ====================
    // Since we're not using images in this demo, we'll add a placeholder function
    // that would handle image lazy loading if present
    
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Call lazy load function (placeholder for future image additions)
    lazyLoadImages();

    // ==================== ANALYTICS / TRACKING (Placeholder) ====================
    // This would be integrated with actual analytics tools
    
    function trackInteraction(element, action) {
        console.log(`Interaction: ${action} - ${element}`);
        // Example: gtag('event', action, { 'event_category': 'user_interaction' });
    }

    // Track button clicks
    const trackableButtons = document.querySelectorAll('.btn-primary, .filter-btn, .faq-question');
    trackableButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim().substring(0, 30);
            trackInteraction(text, 'click');
        });
    });

    // ==================== ERROR HANDLING ====================

    // Global error handler for debugging
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.message, e.filename, e.lineno);
    });

    // ==================== INITIALIZATION ====================

    console.log('%c Libyan Elite University Training Center ', 'background: #000000; color: #00f0ff; font-size: 16px; font-weight: bold; padding: 10px;');
    console.log('%c Website successfully loaded ', 'background: #0a0a0a; color: #b400ff; font-size: 12px; padding: 5px;');

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Reduced motion preference detected - animations disabled');
    }

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }

    // ==================== ACCESSIBILITY ENHANCEMENTS ====================

    // Announce filter changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    // Announce when filters change
    programFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.textContent;
            const count = Array.from(programCards).filter(
                card => card.style.display !== 'none'
            ).length;
            announceToScreenReader(`${filter} programs shown. ${count} items found.`);
        });
    });

    scheduleFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.textContent;
            const count = Array.from(scheduleItems).filter(
                item => item.style.display !== 'none'
            ).length;
            announceToScreenReader(`${filter} sessions shown. ${count} items found.`);
        });
    });

    // Announce FAQ toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isExpanded = item.classList.contains('active');
            const questionText = question.textContent.trim();
            announceToScreenReader(
                isExpanded ? 
                `Expanded: ${questionText}` : 
                `Collapsed: ${questionText}`
            );
        });
    });

}); // End DOMContentLoaded

// ==================== PAGE VISIBILITY API ====================
// Pause animations when page is not visible to save resources

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - pausing non-essential operations');
        document.body.style.animationPlayState = 'paused';
    } else {
        console.log('Page visible - resuming operations');
        document.body.style.animationPlayState = 'running';
    }
});

// ==================== SERVICE WORKER REGISTRATION (Progressive Enhancement) ====================
// For offline functionality and caching - commented out as it requires HTTPS

/*
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('Service Worker registered:', registration);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}
*/

// ==================== END ====================
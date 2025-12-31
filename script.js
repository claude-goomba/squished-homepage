// Floating Squishies Background
function createFloatingSquishies() {
    const container = document.getElementById('floating-squishies');
    const colors = ['#ffb5d5', '#a0e7ff', '#fff7aa', '#d4a5ff', '#98d8aa', '#ffc0cb'];
    
    for (let i = 0; i < 15; i++) {
        const squishy = document.createElement('div');
        squishy.className = 'float-squishy';
        squishy.style.width = Math.random() * 60 + 30 + 'px';
        squishy.style.height = squishy.style.width;
        squishy.style.background = colors[Math.floor(Math.random() * colors.length)];
        squishy.style.left = Math.random() * 100 + '%';
        squishy.style.top = Math.random() * 100 + '%';
        squishy.style.animationDelay = Math.random() * 10 + 's';
        squishy.style.animationDuration = (Math.random() * 15 + 15) + 's';
        container.appendChild(squishy);
    }
}

// Interactive Main Squishy
function initMainSquishy() {
    const squishy = document.getElementById('main-squishy');
    const body = squishy.querySelector('.squishy-body');
    
    let isSquishing = false;
    
    body.addEventListener('mousedown', () => {
        isSquishing = true;
        body.style.transform = 'scale(1.15, 0.8)';
        body.style.transition = 'transform 0.1s ease';
    });
    
    document.addEventListener('mouseup', () => {
        if (isSquishing) {
            isSquishing = false;
            body.style.transform = 'scale(0.9, 1.15)';
            setTimeout(() => {
                body.style.transform = 'scale(1.05, 0.95)';
                setTimeout(() => {
                    body.style.transform = '';
                    body.style.transition = '';
                }, 100);
            }, 100);
        }
    });
    
    // Touch support
    body.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isSquishing = true;
        body.style.transform = 'scale(1.15, 0.8)';
        body.style.transition = 'transform 0.1s ease';
    });
    
    document.addEventListener('touchend', () => {
        if (isSquishing) {
            isSquishing = false;
            body.style.transform = 'scale(0.9, 1.15)';
            setTimeout(() => {
                body.style.transform = 'scale(1.05, 0.95)';
                setTimeout(() => {
                    body.style.transform = '';
                    body.style.transition = '';
                }, 100);
            }, 100);
        }
    });
}

// Product Card Squish Effect
function initProductCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const squishy = card.querySelector('.product-squishy');
        
        card.addEventListener('mouseenter', () => {
            if (squishy) {
                squishy.style.animation = 'productSquish 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (squishy) {
                squishy.style.animation = '';
            }
        });
    });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
    });
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('.email-input').value;
        
        if (email) {
            // Show success message
            const btn = form.querySelector('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Geabonneerd!</span>';
            btn.style.background = '#2ecc71';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 2000);
        }
    });
}

// Cart Button Animation
function initCartButton() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    // Demo: Add to cart when clicking products
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            count++;
            cartCount.textContent = count;
            
            // Bounce animation
            cartBtn.style.animation = 'cartBounce 0.5s ease';
            setTimeout(() => {
                cartBtn.style.animation = '';
            }, 500);
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .product-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes productSquish {
        0%, 100% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2, 0.9) rotate(-5deg); }
    }
    
    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    .nav-links.mobile-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        gap: 15px;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(style);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createFloatingSquishies();
    initMainSquishy();
    initProductCards();
    initSmoothScroll();
    initNavbarScroll();
    initMobileMenu();
    initNewsletterForm();
    initCartButton();
    initScrollAnimations();
});

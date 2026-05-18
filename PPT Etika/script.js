document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            // Toggle menu icon if using something like font-awesome (optional)
            // mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItemsList = document.querySelectorAll('.nav-links a');
    navItemsList.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });

    // --- Active Menu Indicator ---
    const currentPath = window.location.pathname;
    let pageName = currentPath.split('/').pop() || 'index.html';
    
    // Handle the case where the URL ends with a slash or doesn't have an extension
    if (pageName === '' || pageName === '/') {
        pageName = 'index.html';
    }

    navItemsList.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check exact match or both point to index
        if (linkPath === pageName || 
           (pageName === 'index.html' && (linkPath === './' || linkPath === '/'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    // Using Intersection Observer for performant scroll animations
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into view
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the active class to trigger the CSS transition
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed to only animate once
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Navbar Background on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

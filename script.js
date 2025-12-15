document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // --- Header Scroll Effect ---
    // (Optional: can add shadow or reduce height on scroll)
    /*
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    */

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.hero-content, .product-card, .category-item, .story-container');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // You can add a CSS class .visible { opacity: 1; transform: translateY(0); } 
                // and set initial states in CSS to create fade-up effects.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // el.style.opacity = '0'; // Set initial state in JS or CSS
        // el.style.transform = 'translateY(20px)';
        // el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    // --- Product Filtering Logic ---
    const filterPills = document.querySelectorAll('.category-pills .pill');
    const productCards = document.querySelectorAll('#bestsellers .product-card');

    if (filterPills.length > 0 && productCards.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                // 1. Remove active class from all pills
                filterPills.forEach(p => p.classList.remove('active'));
                // 2. Add active class to clicked pill
                pill.classList.add('active');

                const filterValue = pill.getAttribute('data-filter');

                // 3. Show/Hide products
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        // Optional: Add a fade-in animation/class here
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Simple Scroll to Section for Unlinked IDs ---
    // Ensuring nav links scroll smoothly is already handled by the existing snippet,
    // but we need to make sure the target IDs exist.
    // I added #all-jewellery, #gifting to index.html.
    // #gold, #silver, #about, #contact usually need sections. 
    // Creating placeholder targets or relying on valid sections implies future work, 
    // --- Search Functionality ---
    // 1. Image Database (Simulated)
    // 1. Image/Product Database
    const assetDatabase = [
        // --- Rings ---
        { id: 'r1', categories: ['rings', 'gold'], src: 'assets/ring/pic3.png', title: 'Classic Gold Ring', price: '₹15,000' },
        { id: 'r2', categories: ['rings', 'silver'], src: 'assets/ring/pic11.png', title: 'Silver Band', price: '₹4,500' },
        { id: 'r3', categories: ['rings', 'silver', '925'], src: 'assets/ring/pic14.png', title: 'Sterling Silver Ring', price: '₹3,200' },
        { id: 'r4', categories: ['rings', 'gold', 'diamond'], src: 'assets/ring/pic22.png', title: 'Solitaire Ring', price: '₹45,000' },
        { id: 'r5', categories: ['rings', 'gold'], src: 'assets/ring/pic23.png', title: 'Engagement Ring', price: '₹55,000' },
        { id: 'r6', categories: ['rings', 'luxury'], src: 'assets/ring/pic26.png', title: 'Luxury Diamond Ring', price: '₹85,000' },
        { id: 'r7', categories: ['rings', 'fashion'], src: 'assets/ring/pic27.png', title: 'Fashion Ring', price: '₹12,000' },
        { id: 'r8', categories: ['rings', 'gold'], src: 'assets/pic33.jpg', title: 'Eternal Gold Ring', price: '₹79,904' },

        // --- Earrings ---
        { id: 'e1', categories: ['earrings', 'silver'], src: 'assets/earing/pic15.png', title: 'Silver Drop Earrings', price: '₹3,200' },
        { id: 'e2', categories: ['earrings', 'gold'], src: 'assets/earing/pic29.png', title: 'Golden Studs', price: '₹18,500' },
        { id: 'e3', categories: ['earrings', 'gold', 'stud'], src: 'assets/pic34.jpg', title: 'Radiant Gold Earrings', price: '₹45,500' },

        // --- Pendants ---
        { id: 'p1', categories: ['pendants', 'gold'], src: 'assets/pendants/pic1.jpg', title: 'Gold Pendant', price: '₹22,000' },
        { id: 'p2', categories: ['pendants', 'silver'], src: 'assets/pendants/pic10.png', title: 'Silver Locket', price: '₹8,500' },
        { id: 'p3', categories: ['pendants', 'fashion'], src: 'assets/pendants/pic12.png', title: 'Fashion Pendant', price: '₹5,500' },
        { id: 'p4', categories: ['pendants', 'gold'], src: 'assets/pendants/pic16.png', title: 'Heart Pendant', price: '₹18,000' },
        { id: 'p5', categories: ['pendants', 'necklace'], src: 'assets/pendants/pic18.png', title: 'Chain Pendant', price: '₹25,000' },
        { id: 'p6', categories: ['pendants', 'gift'], src: 'assets/pendants/pic21.png', title: 'Gift Pendant', price: '₹12,500' },
        { id: 'p7', categories: ['pendants', 'diamond'], src: 'assets/pendants/pic24.png', title: 'Diamond Pendant', price: '₹65,000' },
        { id: 'p8', categories: ['pendants', 'silver'], src: 'assets/pendants/pic28.png', title: 'Simple Silver Pendant', price: '₹2,500' },
        { id: 'p9', categories: ['pendants', 'gold'], src: 'assets/pendants/pic30.jpg', title: 'Modern Gold Pendant', price: '₹32,000' },

        // --- Bracelets ---
        { id: 'b1', categories: ['bracelets', 'silver'], src: 'assets/Bracelet/pic17.png', title: 'Silver Chain Bracelet', price: '₹5,500' },
        { id: 'b2', categories: ['bracelets', 'model'], src: 'assets/Bracelet/pic2.png', title: 'Model Bracelet', price: '₹15,000' },
        { id: 'b3', categories: ['bracelets', 'diamond'], src: 'assets/Bracelet/pic32.jpg', title: 'Diamond Tennis Bracelet', price: '₹1,20,000' },
        { id: 'b4', categories: ['bracelets', 'gold'], src: 'assets/Bracelet/pic35.jpg', title: 'Twisted Petal Bracelet', price: '₹89,200' },
        { id: 'b5', categories: ['bracelets', 'fashion'], src: 'assets/Bracelet/pic36.jpeg', title: 'Fashion Bracelet', price: '₹9,500' },

        // --- Bangles ---
        // Mapping some bracelets or specific bangle images to 'bangles' category
        { id: 'bg1', categories: ['bangles', 'silver'], src: 'assets/Bracelet/pic19.png', title: 'Designer Silver Bangle', price: '₹8,900' },
        { id: 'bg2', categories: ['bangles', 'gold'], src: 'assets/pic19.png', title: 'Classic Gold Bangle', price: '₹45,000' }, // Assuming pic19 is bangle
        { id: 'bg3', categories: ['bangles', 'gold'], src: 'assets/pic35.jpg', title: 'Gold Cuff Bangle', price: '₹55,000' }, // Reusing good bracelet as bangle for volume

        // --- Others ---
        { id: 'o1', categories: ['accessories', 'gift'], src: 'assets/pic20.png', title: 'Jewellery Care Kit', price: '₹1,500' }
    ];

    // 2. Inject Modal HTML
    const modalHTML = `
        <div id="searchModal" class="search-modal">
            <div class="search-modal-content">
                <span class="close-search">&times;</span>
                <h2 style="margin-bottom:20px; font-family:var(--font-heading);">Search Results</h2>
                <div id="searchResults" class="search-results-grid"></div>
                <div id="noResults" class="no-results" style="display:none;">
                    No results found. Try "ring", "gold", "bracelet", etc.
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const searchModal = document.getElementById('searchModal');
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-icon');

    // 3. Search Logic
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        searchResults.innerHTML = '';
        let found = false;

        assetDatabase.forEach(item => {
            // Check if any keyword matches the query
            if (item.keywords.some(k => k.includes(query)) || item.alt.toLowerCase().includes(query)) {
                found = true;
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.innerHTML = `<img src="${item.src}" alt="${item.alt}" title="${item.alt}">`;
                searchResults.appendChild(resultItem);
            }
        });

        if (found) {
            noResults.style.display = 'none';
        } else {
            noResults.style.display = 'block';
        }

        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Event Listeners
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close when clicking outside
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

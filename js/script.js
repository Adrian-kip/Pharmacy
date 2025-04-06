// Main scripts for the website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuButton && nav) {
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuButton.querySelector('i').classList.remove('fa-times');
                    mobileMenuButton.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Show order success message if redirected from form submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('order') && urlParams.get('order') === 'success') {
        const successMessage = document.createElement('div');
        successMessage.className = 'notification success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Your order has been placed successfully! We'll contact you shortly.</span>
        `;
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }, 5000);
        
        // Remove the query parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Add success notification style
    const style = document.createElement('style');
    style.textContent = `
        .notification.success {
            background-color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Product filtering
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    function filterProducts() {
        const category = categoryFilter ? categoryFilter.value : 'all';
        const sort = sortBy ? sortBy.value : 'popular';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productCategory = card.dataset.category;
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            
            // Filter by category and search term
            const matchesCategory = category === 'all' || productCategory === category;
            const matchesSearch = searchTerm === '' || 
                productName.includes(searchTerm) || 
                productDescription.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Sort products
        const productGrid = document.querySelector('.products-grid');
        if (productGrid) {
            const products = Array.from(productGrid.querySelectorAll('.product-card'));
            
            products.sort((a, b) => {
                const aPrice = parseFloat(a.dataset.price);
                const bPrice = parseFloat(b.dataset.price);
                const aName = a.querySelector('h3').textContent;
                const bName = b.querySelector('h3').textContent;
                
                switch (sort) {
                    case 'price-low':
                        return aPrice - bPrice;
                    case 'price-high':
                        return bPrice - aPrice;
                    case 'name':
                        return aName.localeCompare(bName);
                    default: // popular
                        return 0; // Keep original order
                }
            });
            
            // Re-append sorted products
            products.forEach(product => {
                productGrid.appendChild(product);
            });
        }
    }
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (sortBy) sortBy.addEventListener('change', filterProducts);
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (searchButton) searchButton.addEventListener('click', filterProducts);
});
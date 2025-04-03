// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
    
    // Form Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Prescription Upload Display
    const uploadArea = document.getElementById('upload-area');
    const prescriptionUpload = document.getElementById('prescription-upload');
    const fileNameDisplay = document.getElementById('file-name-display');
    
    if (uploadArea && prescriptionUpload && fileNameDisplay) {
        uploadArea.addEventListener('click', function() {
            prescriptionUpload.click();
        });
        
        prescriptionUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            }
        });
        
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--primary-color)';
            this.style.backgroundColor = 'rgba(108, 92, 231, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', function() {
            this.style.borderColor = 'var(--light-gray)';
            this.style.backgroundColor = 'transparent';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--light-gray)';
            this.style.backgroundColor = 'transparent';
            
            if (e.dataTransfer.files.length > 0) {
                prescriptionUpload.files = e.dataTransfer.files;
                fileNameDisplay.textContent = e.dataTransfer.files[0].name;
            }
        });
    }
    
    // Product View Toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            viewBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            productsGrid.classList.remove('grid-view', 'list-view');
            productsGrid.classList.add(`${viewType}-view`);
        });
    });
    
    // Initialize product view
    if (productsGrid) {
        productsGrid.classList.add('grid-view');
    }
    
    // Product Details Toggle
    const infoBtns = document.querySelectorAll('.info-btn');
    const closeDetailsBtns = document.querySelectorAll('.close-details');
    
    infoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productDetails = productCard.querySelector('.product-details');
            
            productDetails.classList.add('active');
        });
    });
    
    closeDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productDetails = this.closest('.product-details');
            productDetails.classList.remove('active');
        });
    });
    
    // Filter products by category
    const categoryLinks = document.querySelectorAll('[data-category]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Update active state
            categoryLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Sort products
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const productsContainer = document.querySelector('.products-grid');
            const productCards = Array.from(document.querySelectorAll('.product-card'));
            
            productCards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                const nameA = a.querySelector('h3').textContent.toLowerCase();
                const nameB = b.querySelector('h3').textContent.toLowerCase();
                
                switch(sortValue) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'name':
                        return nameA.localeCompare(nameB);
                    default:
                        return 0;
                }
            });
            
            // Re-append sorted products
            productCards.forEach(card => productsContainer.appendChild(card));
        });
    }
    
    // Quantity Selector
    const quantityMinusBtns = document.querySelectorAll('.quantity-btn.minus');
    const quantityPlusBtns = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.quantity-selector input');
    
    quantityMinusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
    
    quantityPlusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (parseInt(this.value) < 1 || isNaN(parseInt(this.value))) {
                this.value = 1;
            }
        });
    });
});

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = [];
    
    // Load cart from localStorage
    if (localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        updateCartCount();
    }
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card') || this.closest('.otc-product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('img').src;
            const quantity = productCard.querySelector('.quantity-selector input') ? 
                parseInt(productCard.querySelector('.quantity-selector input').value) : 1;
            
            // Check if product already in cart
            const existingItem = cartItems.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: quantity
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Update cart count
            updateCartCount();
            
            // Show success message
            showToast(`${productName} added to cart`);
        });
    });
    
    function updateCartCount() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});

// Toast styles (added via JavaScript to avoid FOUC)
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background-color: var(--primary-color);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s ease;
}
.toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}
`;
document.head.appendChild(toastStyles);
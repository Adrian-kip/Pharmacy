// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count in header
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }
    
    // Update cart totals
    function updateCartTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const deliveryFee = 200; // Fixed delivery fee
        const total = subtotal + deliveryFee;
        
        if (document.querySelector('.subtotal')) {
            document.querySelector('.subtotal').textContent = `KSh ${subtotal.toLocaleString()}`;
            document.querySelector('.delivery-fee').textContent = `KSh ${deliveryFee.toLocaleString()}`;
            document.querySelector('.total-amount').textContent = `KSh ${total.toLocaleString()}`;
            
            // Update hidden inputs for form submission
            if (document.getElementById('cart-items-input')) {
                document.getElementById('cart-items-input').value = JSON.stringify(cart);
            }
            if (document.getElementById('total-amount-input')) {
                document.getElementById('total-amount-input').value = total;
            }
        }
    }
    
    // Render cart items
    function renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="stock.html" class="btn btn-primary">Shop Now</a>
                </div>
            `;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-image">
                        <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}">
                    </div>
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                </div>
                <div class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const item = cart.find(item => item.id.toString() === itemId);
                if (item) {
                    item.quantity++;
                    saveCart();
                }
            });
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const itemIndex = cart.findIndex(item => item.id.toString() === itemId);
                if (itemIndex !== -1) {
                    if (cart[itemIndex].quantity > 1) {
                        cart[itemIndex].quantity--;
                    } else {
                        cart.splice(itemIndex, 1);
                    }
                    saveCart();
                }
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                cart = cart.filter(item => item.id.toString() !== itemId);
                saveCart();
            });
        });
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartTotals();
        renderCartItems();
    }
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);
            const image = this.closest('.product-card').querySelector('.product-image img').src;
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity: 1,
                    image
                });
            }
            
            saveCart();
            
            // Show success message
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${name} added to cart</span>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });
    
    // Initialize cart on page load
    updateCartCount();
    updateCartTotals();
    renderCartItems();
    
    // Notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            opacity: 1;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
});
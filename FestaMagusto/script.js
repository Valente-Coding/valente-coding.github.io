// Sample products - you can customize these
const products = [
    { id: 4, name: 'Cerveja', icon: '🍺', price: 2.50 },
    { id: 5, name: 'Refrigerante', icon: '🥤', price: 2.50 },
    { id: 3, name: 'Água', icon: '💧', price: 2.50 },
    { id: 2, name: 'Vinho', icon: '🍷', price: 3.50 },
    { id: 6, name: 'Sangria', icon: '🍹', price: 3.50 },
    { id: 7, name: 'Espumante', icon: '🍾', price: 3.50 },
    { id: 8, name: 'Gin', icon: '🍸', price: 7.00 },
    { id: 9, name: 'Feijoada', icon: '🍲', price: 10.00 },
    { id: 10, name: 'Bifana', icon: '🥪', price: 3.50 },
    { id: 11, name: '1/4 de Pizza', icon: '🍕', price: 3.50 },
    { id: 12, name: 'Pizza Inteira', icon: '🍕', price: 14.00 },
    { id: 13, name: 'Mousse', icon: '🍮', price: 5.00 },
];

let cart = [];

// Initialize products grid
function initProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="addToCart(${product.id})">
            <div class="product-icon">${product.icon}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">€${product.price.toFixed(2)}</div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    // Add pulse animation
    const card = event.currentTarget;
    card.classList.add('adding');
    setTimeout(() => card.classList.remove('adding'), 300);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Clear entire cart
function clearCart() {
    if (cart.length > 0 && confirm('Clear all items from cart?')) {
        cart = [];
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const countElement = document.getElementById('cart-count');
    const tickets350Element = document.getElementById('tickets350');
    const tickets250Element = document.getElementById('tickets250');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = total.toFixed(2);

    // Update ticket counts
    // Calculate optimal combination of tickets to minimize leftover money
    let bestTickets350 = 0;
    let bestTickets250 = 0;
    let minLeftover = total;
    
    // Try all possible combinations of 3.50€ tickets
    const maxTickets350 = Math.floor(total / 3.50);
    for (let tickets350 = 0; tickets350 <= maxTickets350; tickets350++) {
        const remaining = total - (tickets350 * 3.50);
        const tickets250 = Math.floor(remaining / 2.50);
        const leftover = remaining - (tickets250 * 2.50);
        
        // Prefer solutions with more balanced ticket counts and minimal leftover
        const ticketDifference = Math.abs(tickets350 - tickets250);
        const currentScore = leftover + (ticketDifference * 0.1); // Small penalty for imbalance
        
        if (leftover < minLeftover || (leftover === minLeftover && ticketDifference < Math.abs(bestTickets350 - bestTickets250))) {
            minLeftover = leftover;
            bestTickets350 = tickets350;
            bestTickets250 = tickets250;
        }
    }

    tickets350Element.textContent = `${bestTickets350}x`;
    tickets250Element.textContent = `${bestTickets250}x`;

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">No items added yet</div>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.icon} ${item.name}</div>
                    <div class="cart-item-price">€${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <div class="qty-display">${item.quantity}</div>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the app
initProducts();

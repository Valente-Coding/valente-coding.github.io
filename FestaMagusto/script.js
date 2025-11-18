// Sample products - you can customize these
const products = [
    { id: 14, name: 'Entrada', icon: '🚪', price: 20.00 },
    { id: 15, name: 'Sopa', icon: '🥣', price: 3.50 },
    { id: 4, name: 'Cerveja', icon: '🍺', price: 3.50 },
    { id: 5, name: 'Refrigerante', icon: '🥤', price: 2.50 },
    { id: 3, name: 'Água', icon: '💧', price: 2.50 },
    { id: 2, name: 'Vinho', icon: '🍷', price: 3.50 },
    { id: 6, name: 'Sangria', icon: '🍹', price: 3.50 },
    { id: 7, name: 'Espumante', icon: '🍾', price: 3.50 },
    { id: 8, name: 'Gin', icon: '🍸', price: 7.00 },
    { id: 16, name: 'Shot', icon: '🥃', price: 2.50 },
    { id: 9, name: 'Feijoada', icon: '🍲', price: 10.00 },
    { id: 10, name: 'Bifana', icon: '🥪', price: 3.50 },
    { id: 11, name: '1/4 de Pizza', icon: '🍕', price: 3.50 },
    { id: 12, name: 'Pizza Inteira', icon: '🍕', price: 14.00 },
    { id: 13, name: 'Mousse', icon: '🍮', price: 3.50 },
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
    // let bestTickets350 = 0;
    // let bestTickets250 = 0;
    // let minLeftover = total;
    
    // // Try all possible combinations of 3.50€ tickets
    // const maxTickets350 = Math.floor(total / 3.50);
    // for (let tickets350 = 0; tickets350 <= maxTickets350; tickets350++) {
    //     const remaining = total - (tickets350 * 3.50);
    //     const tickets250 = Math.floor(remaining / 2.50);
    //     const leftover = remaining - (tickets250 * 2.50);
        
    //     // Prefer solutions with more balanced ticket counts and minimal leftover
    //     const ticketDifference = Math.abs(tickets350 - tickets250);
    //     const currentScore = leftover + (ticketDifference * 0.1); // Small penalty for imbalance
        
    //     if (leftover < minLeftover || (leftover === minLeftover && ticketDifference < Math.abs(bestTickets350 - bestTickets250))) {
    //         minLeftover = leftover;
    //         bestTickets350 = tickets350;
    //         bestTickets250 = tickets250;
    //     }
    // }

    //Ticket Counts
    let tickets350 = 0;
    let tickets250 = 0;
    cart.forEach(item => {
        let isMod350 = (item.price % 3.5) == 0;
        let isMod250 = (item.price % 2.5) == 0;

        tickets350 += isMod350 ? item.quantity : 0;
        tickets250 += !isMod350 && isMod250 ?  item.quantity : 0;
    });


    tickets350Element.textContent = `${tickets350}x`;
    tickets250Element.textContent = `${tickets250}x`;

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

function saveCart() {
    if (cart.length === 0) {
        alert('Cart is empty. Add items before saving.');
        return;
    }

    // Check if Firebase is initialized
    if (!window.firebaseDB) {
        console.error('Firebase is not initialized');
        alert('Database connection not available');
        return;
    }

    // Show payment method modal
    showPaymentMethodModal();
}

function showPaymentMethodModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'payment-modal-overlay';
    modal.innerHTML = `
        <div class="payment-modal">
            <div class="payment-modal-title">Select Payment Method</div>
            <div class="payment-modal-buttons">
                <button class="payment-method-btn cash-btn" onclick="saveCartWithPaymentMethod('Cash')">
                    <i class="fa-solid fa-money-bill-wave"></i>
                    <span>Cash</span>
                </button>
                <button class="payment-method-btn bank-btn" onclick="saveCartWithPaymentMethod('Bank')">
                    <i class="fa-solid fa-credit-card"></i>
                    <span>Bank</span>
                </button>
            </div>
            <button class="payment-modal-cancel" onclick="closePaymentModal()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    setTimeout(() => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePaymentModal();
            }
        });
    }, 100);
}

function closePaymentModal() {
    const modal = document.querySelector('.payment-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function saveCartWithPaymentMethod(paymentMethod) {
    // Close modal
    closePaymentModal();

    const db = window.firebaseDB;
    const { collection, addDoc, serverTimestamp, doc, setDoc, getDoc, updateDoc, increment } = window.firebaseModules;

    // Calculate cart totals
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Prepare cart data with payment method
    const cartData = {
        timestamp: serverTimestamp(),
        total: parseFloat(total.toFixed(2)),
        totalItems: totalItems,
        paymentMethod: paymentMethod, // Add payment method
        items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            icon: item.icon,
            price: item.price,
            quantity: item.quantity,
            subtotal: parseFloat((item.price * item.quantity).toFixed(2))
        }))
    };

    // Save to Firebase
    Promise.all([
        // Save individual cart transaction
        addDoc(collection(db, 'carts'), cartData),
        
        // Update product sales statistics
        ...cart.map(item => {
            const productRef = doc(db, 'products', item.id.toString());
            return getDoc(productRef).then(docSnap => {
                if (docSnap.exists()) {
                    // Update existing product stats
                    return updateDoc(productRef, {
                        totalQuantitySold: increment(item.quantity),
                        totalRevenue: increment(parseFloat((item.price * item.quantity).toFixed(2))),
                        lastSold: serverTimestamp()
                    });
                } else {
                    // Create new product stats document
                    return setDoc(productRef, {
                        productId: item.id,
                        name: item.name,
                        icon: item.icon,
                        price: item.price,
                        totalQuantitySold: item.quantity,
                        totalRevenue: parseFloat((item.price * item.quantity).toFixed(2)),
                        firstSold: serverTimestamp(),
                        lastSold: serverTimestamp()
                    });
                }
            });
        }),

        // Update daily summary with payment method tracking
        (async () => {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const summaryRef = doc(db, 'dailySummary', today);
            const summarySnap = await getDoc(summaryRef);
            
            const paymentMethodField = paymentMethod === 'Cash' ? 'cashTransactions' : 'bankTransactions';
            const paymentMethodSalesField = paymentMethod === 'Cash' ? 'cashSales' : 'bankSales';
            
            if (summarySnap.exists()) {
                return updateDoc(summaryRef, {
                    totalSales: increment(total),
                    totalTransactions: increment(1),
                    totalItemsSold: increment(totalItems),
                    [paymentMethodField]: increment(1),
                    [paymentMethodSalesField]: increment(total),
                    lastUpdate: serverTimestamp()
                });
            } else {
                return setDoc(summaryRef, {
                    date: today,
                    totalSales: total,
                    totalTransactions: 1,
                    totalItemsSold: totalItems,
                    cashTransactions: paymentMethod === 'Cash' ? 1 : 0,
                    cashSales: paymentMethod === 'Cash' ? total : 0,
                    bankTransactions: paymentMethod === 'Bank' ? 1 : 0,
                    bankSales: paymentMethod === 'Bank' ? total : 0,
                    lastUpdate: serverTimestamp()
                });
            }
        })()
    ])
    .then(() => {
        alert(`Cart saved successfully! ✅\nPayment: ${paymentMethod}`);
        // Clear cart after successful save
        cart = [];
        updateCart();
    })
    .catch((error) => {
        console.error('Error saving cart:', error);
        alert('Error saving cart. Please try again.');
    });
}

// Load analytics data for date range
async function loadAnalytics() {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const analyticsProductsDiv = document.getElementById('analytics-products');
    const totalRevenueElement = document.getElementById('total-revenue');
    const totalCashRevenueElement = document.getElementById('total-cash-revenue');
    const totalBankRevenueElement = document.getElementById('total-bank-revenue');
    const totalItemsSoldElement = document.getElementById('total-items-sold');

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const startTime = startTimeInput.value || '00:00';
    const endTime = endTimeInput.value || '23:59';

    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }

    // Combine date and time
    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate}T${endTime}:59`);

    if (startDateTime > endDateTime) {
        alert('Start date/time must be before end date/time');
        return;
    }

    // Check if Firebase is initialized
    if (!window.firebaseDB) {
        console.error('Firebase is not initialized');
        alert('Database connection not available');
        return;
    }

    const db = window.firebaseDB;
    const { collection, query, where, getDocs } = window.firebaseModules;

    // Show loading state
    analyticsProductsDiv.innerHTML = '<div class="loading-analytics">Loading analytics data...</div>';

    try {
        // Query carts within date range
        const cartsRef = collection(db, 'carts');

        const q = query(
            cartsRef,
            where('timestamp', '>=', startDateTime),
            where('timestamp', '<=', endDateTime)
        );

        const querySnapshot = await getDocs(q);

        // Aggregate data
        let totalRevenue = 0;
        let totalCashRevenue = 0;
        let totalBankRevenue = 0;
        let totalItemsSold = 0;
        const productSales = {};

        querySnapshot.forEach((doc) => {
            const cartData = doc.data();
            const cartTotal = cartData.total || 0;
            totalRevenue += cartTotal;
            totalItemsSold += cartData.totalItems || 0;

            // Sum revenue by payment method
            if (cartData.paymentMethod === 'Cash') {
                totalCashRevenue += cartTotal;
            } else if (cartData.paymentMethod === 'Bank') {
                totalBankRevenue += cartTotal;
            }

            // Aggregate product sales
            if (cartData.items) {
                cartData.items.forEach(item => {
                    if (!productSales[item.productId]) {
                        productSales[item.productId] = {
                            id: item.productId,
                            name: item.name,
                            icon: item.icon,
                            price: item.price,
                            quantity: 0,
                            revenue: 0
                        };
                    }
                    productSales[item.productId].quantity += item.quantity;
                    productSales[item.productId].revenue += item.subtotal;
                });
            }
        });

        // Update summary cards
        totalRevenueElement.textContent = `€${totalRevenue.toFixed(2)}`;
        totalCashRevenueElement.textContent = `€${totalCashRevenue.toFixed(2)}`;
        totalBankRevenueElement.textContent = `€${totalBankRevenue.toFixed(2)}`;
        totalItemsSoldElement.textContent = totalItemsSold;

        // Display product sales
        const productSalesArray = Object.values(productSales).sort((a, b) => b.revenue - a.revenue);

        if (productSalesArray.length === 0) {
            analyticsProductsDiv.innerHTML = '<div class="empty-analytics">No sales data found for this date range</div>';
        } else {
            analyticsProductsDiv.innerHTML = productSalesArray.map(product => `
                <div class="analytics-product-card">
                    <div class="analytics-product-icon">${product.icon}</div>
                    <div class="analytics-product-info">
                        <div class="analytics-product-name">${product.name}</div>
                        <div class="analytics-product-quantity">${product.quantity} sold</div>
                    </div>
                    <div class="analytics-product-stats">
                        <div class="analytics-product-revenue">€${product.revenue.toFixed(2)}</div>
                        <div class="analytics-product-price">€${product.price.toFixed(2)} each</div>
                    </div>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading analytics:', error);
        analyticsProductsDiv.innerHTML = '<div class="empty-analytics">Error loading analytics data. Please try again.</div>';
        alert('Error loading analytics data');
    }
}

// Clear analytics display
function clearAnalytics() {
    const analyticsProductsDiv = document.getElementById('analytics-products');
    const totalRevenueElement = document.getElementById('total-revenue');
    const totalCashRevenueElement = document.getElementById('total-cash-revenue');
    const totalBankRevenueElement = document.getElementById('total-bank-revenue');
    const totalItemsSoldElement = document.getElementById('total-items-sold');

    // Reset all summary values
    totalRevenueElement.textContent = '€0.00';
    totalCashRevenueElement.textContent = '€0.00';
    totalBankRevenueElement.textContent = '€0.00';
    totalItemsSoldElement.textContent = '0';

    // Clear product analytics
    analyticsProductsDiv.innerHTML = '<div class="empty-analytics">Select a date range and click Load to view sales data</div>';
}

// Set default dates on page load
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    
    if (startDateInput && endDateInput) {
        startDateInput.valueAsDate = startOfMonth;
        endDateInput.valueAsDate = today;
    }
    
    if (startTimeInput && endTimeInput) {
        startTimeInput.value = '00:00';
        endTimeInput.value = '23:59';
    }
});

// Initialize the app
initProducts();

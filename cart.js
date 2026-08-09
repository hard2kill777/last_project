/* cart.js - Страница корзины */

let cart = JSON.parse(localStorage.getItem('examCart')) || [];

// =========================
// 1. ЗАГРУЗКА И ОТРИСОВКА КОРЗИНЫ
// =========================
function renderCart() {
    const container = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-message');
    const formContainer = document.getElementById('order-form-container');

    if (cart.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = 'block';
        formContainer.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    formContainer.style.display = 'block';

    // Находим товары в глобальной базе allGoods
    const cartGoods = allGoods.filter(g => cart.includes(g.id));
    
    let html = '';
    cartGoods.forEach(g => {
        const price = g.discount_price || g.actual_price;
        html += `
            <div class="goods-card">
                <img src="${g.image_url}" alt="${g.name}">
                <h4>${g.name}</h4>
                <div>⭐ ${g.rating}</div>
                <div class="price">${price}₽</div>
                <button onclick="removeFromCart(${g.id})" style="background:#dc3545;">Удалить</button>
            </div>
        `;
    });
    container.innerHTML = html;
    
    updateTotal(); // Важно! Сразу пересчитываем цену
}

// =========================
// 2. УДАЛЕНИЕ ИЗ КОРЗИНЫ
// =========================
function removeFromCart(goodId) {
    cart = cart.filter(id => id !== goodId);
    localStorage.setItem('examCart', JSON.stringify(cart));
    renderCart();
    showNotification('🗑️ Товар удален из корзины', 'info');
}

// =========================
// 3. РАСЧЕТ СТОИМОСТИ ЗАКАЗА
// =========================
function updateTotal() {
    const cartGoods = allGoods.filter(g => cart.includes(g.id));
    let goodsTotal = 0;
    cartGoods.forEach(g => {
        goodsTotal += (g.discount_price || g.actual_price);
    });

    let deliveryCost = 200; // Базовая

    const dateInput = document.getElementById('delivery_date');
    if (dateInput.value) {
        const date = new Date(dateInput.value);
        const day = date.getDay();
        const hour = new Date().getHours();

        if (day === 6 || day === 0) {
            deliveryCost += 300;
        } else if (hour >= 18) {
            deliveryCost += 200;
        }
    }

    document.getElementById('total-cost').textContent = (goodsTotal + deliveryCost) + ' руб.';
}

document.getElementById('delivery_date').addEventListener('change', updateTotal);

// =========================
// 4. ОФОРМЛЕНИЕ ЗАКАЗА (Эмуляция)
// =========================
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        showNotification('❌ Корзина пуста. Добавьте товары!', 'error');
        return;
    }

    // Собираем данные
    const orderData = {
        full_name: document.getElementById('full_name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subscribe: document.getElementById('subscribe').checked ? 1 : 0,
        delivery_address: document.getElementById('delivery_address').value,
        delivery_date: document.getElementById('delivery_date').value,
        delivery_interval: document.getElementById('delivery_interval').value,
        comment: document.getElementById('comment').value,
        good_ids: cart
    };

    console.log("Эмуляция отправки заказа:", orderData);
    
    // Сохраняем заказ в localStorage, чтобы profile.js мог его прочитать
    let orders = JSON.parse(localStorage.getItem('examOrders')) || [];
    orders.push({
        ...orderData,
        id: Date.now(),
        created_at: new Date().toISOString(),
        _total: parseInt(document.getElementById('total-cost').textContent)
    });
    localStorage.setItem('examOrders', JSON.stringify(orders));

    showNotification('✅ Заказ успешно оформлен!', 'success');
    
    cart = [];
    localStorage.removeItem('examCart');
    renderCart();
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

// =========================
// 5. УВЕДОМЛЕНИЯ
// =========================
function showNotification(message, type = 'info') {
    const area = document.getElementById('notification-area');
    if (!area) return;
    const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8' };
    const el = document.createElement('div');
    el.style.cssText = `padding:12px 20px; margin-bottom:10px; border-radius:6px; color:#fff; background:${colors[type]}; transition:opacity 0.5s ease; font-weight:500;`;
    el.textContent = message;
    area.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 500);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', renderCart);

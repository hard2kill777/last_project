/* script.js - Главная страница */

let cart = JSON.parse(localStorage.getItem('examCart')) || [];
let currentPage = 1;
const perPage = 10;
let allLoaded = false;
let currentFilteredGoods = [...allGoods];

// =========================
// 1. ЗАГРУЗКА И ОТРИСОВКА ТОВАРОВ
// =========================
function loadGoods(reset = false) {
    if (allLoaded && !reset) return;

    if (reset) {
        document.getElementById('goods-grid').innerHTML = '';
        currentPage = 1;
        allLoaded = false;
        currentFilteredGoods = filterGoods([...allGoods]);
    }

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageGoods = currentFilteredGoods.slice(start, end);

    if (pageGoods.length === 0) {
        allLoaded = true;
        document.getElementById('load-more-btn').style.display = 'none';
        if (reset && currentFilteredGoods.length === 0) {
            document.getElementById('goods-grid').innerHTML = '<p>Нет товаров, соответствующих вашему запросу.</p>';
        }
        return;
    }

    renderGoods(pageGoods);
    currentPage++;
    allLoaded = (end >= currentFilteredGoods.length);

    document.getElementById('load-more-btn').style.display = allLoaded ? 'none' : 'block';
}

function renderGoods(goods) {
    const grid = document.getElementById('goods-grid');
    goods.forEach(g => {
        const price = g.discount_price || g.actual_price;
        const oldPriceHtml = g.discount_price ? `<span class="old-price">${g.actual_price}₽</span>` : '';
        const inCart = cart.includes(g.id);
        const btnText = inCart ? '✅ В корзине' : 'Добавить в корзину';
        const btnDisabled = inCart ? 'disabled' : '';

        const card = document.createElement('div');
        card.className = 'goods-card';
        card.innerHTML = `
            <img src="${g.image_url}" alt="${g.name}">
            <h4 title="${g.name}">${g.name.length > 30 ? g.name.slice(0, 30) + '...' : g.name}</h4>
            <div>⭐ ${g.rating}</div>
            <div class="price">${price}₽ ${oldPriceHtml}</div>
            <button onclick="addToCart(${g.id})" ${btnDisabled}>${btnText}</button>
        `;
        grid.appendChild(card);
    });
}

// =========================
// 2. ФИЛЬТРАЦИЯ (Эмуляция)
// =========================
function filterGoods(goods) {
    const priceFrom = document.getElementById('price-from').value;
    const priceTo = document.getElementById('price-to').value;
    const discountOnly = document.getElementById('discount-only').checked;
    
    let filtered = [...goods];
    if (priceFrom) filtered = filtered.filter(g => (g.discount_price || g.actual_price) >= Number(priceFrom));
    if (priceTo) filtered = filtered.filter(g => (g.discount_price || g.actual_price) <= Number(priceTo));
    if (discountOnly) filtered = filtered.filter(g => g.discount_price !== null);
    
    // Сортировка
    const sort = document.getElementById('sort-select').value;
    if (sort === 'rating_desc') filtered.sort((a,b) => b.rating - a.rating);
    else if (sort === 'rating_asc') filtered.sort((a,b) => a.rating - b.rating);
    else if (sort === 'price_asc') filtered.sort((a,b) => (a.discount_price || a.actual_price) - (b.discount_price || b.actual_price));
    else if (sort === 'price_desc') filtered.sort((a,b) => (b.discount_price || b.actual_price) - (a.discount_price || a.actual_price));

    return filtered;
}

document.getElementById('apply-filters-btn').addEventListener('click', function() {
    loadGoods(true);
});

document.getElementById('sort-select').addEventListener('change', function() {
    loadGoods(true);
});

// =========================
// 3. КОРЗИНА (localStorage)
// =========================
function addToCart(goodId) {
    if (!cart.includes(goodId)) {
        cart.push(goodId);
        localStorage.setItem('examCart', JSON.stringify(cart));
        showNotification('✅ Товар добавлен в корзину!', 'success');
        updateCartCount();
        loadGoods(true); // Перерисовываем, чтобы кнопка изменилась
    } else {
        showNotification('ℹ️ Товар уже в корзине', 'info');
    }
}

function updateCartCount() {
    const cartLink = document.querySelector('.header-nav a[href="cart.html"]');
    if (cartLink) {
        cartLink.textContent = `🛒 Корзина (${cart.length})`;
    }
}

// =========================
// 4. УВЕДОМЛЕНИЯ
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

// =========================
// 5. ИНИЦИАЛИЗАЦИЯ
// =========================
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadGoods(true);
    document.getElementById('load-more-btn').addEventListener('click', () => loadGoods(false));
});
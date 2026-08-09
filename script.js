/* script.js - Главная страница с поиском и фильтрацией */

let cart = JSON.parse(localStorage.getItem('examCart')) || [];
let currentFilteredGoods = [...allGoods];

// =========================
// 1. ЗАГРУЗКА И ОТРИСОВКА ТОВАРОВ
// =========================
function loadGoods(reset = false) {
    const grid = document.getElementById('goods-grid');
    if (!grid) return;

    // Получаем отфильтрованные данные
    currentFilteredGoods = getFilteredAndSearchedGoods();

    if (reset) {
        grid.innerHTML = '';
    }

    if (currentFilteredGoods.length === 0) {
        grid.innerHTML = '<p style="text-align:center; padding:40px; color:#888;">Нет товаров, соответствующих вашему запросу.</p>';
        document.getElementById('load-more-btn').style.display = 'none';
        return;
    }

    // Отрисовываем все найденные товары (без пагинации для простоты)
    renderGoods(currentFilteredGoods);
    document.getElementById('load-more-btn').style.display = 'none';
}

function renderGoods(goods) {
    const grid = document.getElementById('goods-grid');
    grid.innerHTML = '';
    
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
            <h4 title="${g.name}">${g.name.length > 40 ? g.name.slice(0, 40) + '...' : g.name}</h4>
            <div>⭐ ${g.rating}</div>
            <div class="price">${price}₽ ${oldPriceHtml}</div>
            <button onclick="addToCart(${g.id})" ${btnDisabled}>${btnText}</button>
        `;
        grid.appendChild(card);
    });
}

// =========================
// 2. ФИЛЬТРАЦИЯ И ПОИСК (ГЛАВНАЯ ЛОГИКА)
// =========================

// Функция, которая применяет ВСЕ фильтры и поиск
function getFilteredAndSearchedGoods() {
    let filtered = [...allGoods];

    // 1. Поиск по названию
    const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
    if (searchQuery) {
        filtered = filtered.filter(g => g.name.toLowerCase().includes(searchQuery));
    }

    // 2. Фильтр по цене
    const priceFrom = document.getElementById('price-from').value;
    const priceTo = document.getElementById('price-to').value;
    if (priceFrom) filtered = filtered.filter(g => (g.discount_price || g.actual_price) >= Number(priceFrom));
    if (priceTo) filtered = filtered.filter(g => (g.discount_price || g.actual_price) <= Number(priceTo));

    // 3. Фильтр по скидке
    const discountOnly = document.getElementById('discount-only').checked;
    if (discountOnly) filtered = filtered.filter(g => g.discount_price !== null);

    // 4. Фильтр по категориям
    const selectedCategories = document.querySelectorAll('#categories-container input:checked');
    if (selectedCategories.length > 0) {
        const checkedValues = Array.from(selectedCategories).map(cb => cb.value);
        filtered = filtered.filter(g => checkedValues.includes(g.main_category));
    }

    // 5. Сортировка
    const sort = document.getElementById('sort-select').value;
    if (sort === 'rating_desc') filtered.sort((a,b) => b.rating - a.rating);
    else if (sort === 'rating_asc') filtered.sort((a,b) => a.rating - b.rating);
    else if (sort === 'price_asc') filtered.sort((a,b) => (a.discount_price || a.actual_price) - (b.discount_price || b.actual_price));
    else if (sort === 'price_desc') filtered.sort((a,b) => (b.discount_price || b.actual_price) - (a.discount_price || a.actual_price));

    return filtered;
}

// Создание чекбоксов категорий (вызывается при загрузке)
function renderCategoryCheckboxes() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    // Собираем уникальные категории
    const categories = [...new Set(allGoods.map(g => g.main_category))];
    
    let html = '';
    categories.forEach(cat => {
        html += `
            <label style="display:block; margin-bottom:5px;">
                <input type="checkbox" value="${cat}"> ${cat}
            </label>
        `;
    });
    container.innerHTML = html;
}

// =========================
// 3. КОРЗИНА (localStorage)
// =========================
function addToCart(goodId) {
    if (!cart.includes(goodId)) {
        cart.push(goodId);
        localStorage.setItem('examCart', JSON.stringify(cart));
        showNotification('✅ Товар добавлен в корзину!', 'success');
        updateCartCount();
        loadGoods(); // Перерисовываем, чтобы обновить кнопки
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
// 5. ИНИЦИАЛИЗАЦИЯ И СОБЫТИЯ
// =========================
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryCheckboxes(); // Создаем чекбоксы
    updateCartCount();
    loadGoods();

    // Кнопка "Применить" (Фильтры)
    document.getElementById('apply-filters-btn').addEventListener('click', () => {
        loadGoods();
    });

    // Кнопка "Найти" (Поиск)
    document.getElementById('search-btn').addEventListener('click', () => {
        loadGoods();
    });

    // Сортировка
    document.getElementById('sort-select').addEventListener('change', () => {
        loadGoods();
    });

    // Поиск по нажатию Enter (в поле ввода)
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadGoods();
        }
    });
});

/* profile.js - Личный кабинет (Исправленная версия) */

// =========================
// 1. ОТРИСОВКА ТАБЛИЦЫ
// =========================
function renderOrders() {
    const tbody = document.getElementById('orders-list');
    if (!tbody) {
        console.error("Ошибка: Не найден элемент tbody с id='orders-list'");
        return;
    }

    // Проверяем, существует ли переменная allGoods (она должна быть в goods.js)
    if (typeof allGoods === 'undefined') {
        tbody.innerHTML = '<tr><td colspan="6" style="color:red; text-align:center;">Ошибка: не загружен файл goods.js</td></tr>';
        console.error("Переменная allGoods не найдена. Проверьте подключение <script src='goods.js'>");
        return;
    }

    // Загружаем заказы из localStorage
    let orders = JSON.parse(localStorage.getItem('examOrders')) || [];
    
    // Если заказов нет
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px;">У вас пока нет оформленных заказов.</td></tr>';
        return;
    }

    // Сортируем: новые заказы сверху
    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    let html = '';
    orders.forEach((order, index) => {
        // Собираем названия товаров по их ID
        const names = order.good_ids.map(id => {
            const g = allGoods.find(g => g.id === id);
            return g ? g.name : 'Товар удалён из каталога';
        });
        
        // Форматируем дату заказа
        const date = new Date(order.created_at);
        const dateStr = `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;

        // Если по какой-то причине цена не сохранилась, пересчитываем её
        let totalPrice = order._total;
        if (!totalPrice || totalPrice === 0) {
            totalPrice = 200; // Базовая доставка
            order.good_ids.forEach(id => {
                const g = allGoods.find(g => g.id === id);
                if (g) totalPrice += (g.discount_price || g.actual_price);
            });
        }

        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${dateStr}</td>
                <td>${names.join(', ')}</td>
                <td>${totalPrice}₽</td>
                <td>${order.delivery_date || '—'}<br>${order.delivery_interval || '—'}</td>
                <td>
                    <button class="action-btn view-btn" data-id="${order.id}" onclick="openView(${order.id})">👁️</button>
                    <button class="action-btn edit-btn" data-id="${order.id}" onclick="openEdit(${order.id})">✏️</button>
                    <button class="action-btn delete-btn" data-id="${order.id}" onclick="openDelete(${order.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

// =========================
// 2. МОДАЛЬНОЕ ОКНО: ПРОСМОТР
// =========================
function openView(id) {
    const orders = JSON.parse(localStorage.getItem('examOrders')) || [];
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const names = order.good_ids.map(id => {
        const g = allGoods.find(g => g.id === id);
        return g ? g.name : 'Удалено';
    });

    const date = new Date(order.created_at);
    const dateStr = `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;

    let totalPrice = order._total;
    if (!totalPrice || totalPrice === 0) {
        totalPrice = 200;
        order.good_ids.forEach(id => {
            const g = allGoods.find(g => g.id === id);
            if (g) totalPrice += (g.discount_price || g.actual_price);
        });
    }

    document.getElementById('view-content').innerHTML = `
        <p><strong>Имя:</strong> ${order.full_name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Телефон:</strong> ${order.phone}</p>
        <p><strong>Адрес:</strong> ${order.delivery_address}</p>
        <p><strong>Дата доставки:</strong> ${order.delivery_date}</p>
        <p><strong>Время:</strong> ${order.delivery_interval}</p>
        <p><strong>Комментарий:</strong> ${order.comment}</p>
        <p><strong>Состав:</strong> ${names.join(', ')}</p>
        <p><strong>Стоимость:</strong> ${totalPrice}₽</p>
    `;
    document.getElementById('modal-view').style.display = 'flex';
}

// =========================
// 3. МОДАЛЬНОЕ ОКНО: РЕДАКТИРОВАНИЕ
// =========================
function openEdit(id) {
    const orders = JSON.parse(localStorage.getItem('examOrders')) || [];
    const order = orders.find(o => o.id === id);
    if (!order) return;

    document.getElementById('edit-id').value = order.id;
    document.getElementById('edit-full_name').value = order.full_name || '';
    document.getElementById('edit-email').value = order.email || '';
    document.getElementById('edit-phone').value = order.phone || '';
    document.getElementById('edit-delivery_address').value = order.delivery_address || '';
    document.getElementById('edit-delivery_date').value = order.delivery_date || '';
    document.getElementById('edit-delivery_interval').value = order.delivery_interval || '';
    document.getElementById('edit-comment').value = order.comment || '';

    document.getElementById('modal-edit').style.display = 'flex';
}

document.getElementById('save-edit-btn').addEventListener('click', function() {
    const id = document.getElementById('edit-id').value;
    const orders = JSON.parse(localStorage.getItem('examOrders')) || [];
    const index = orders.findIndex(o => o.id === id);
    
    if (index !== -1) {
        orders[index].full_name = document.getElementById('edit-full_name').value;
        orders[index].email = document.getElementById('edit-email').value;
        orders[index].phone = document.getElementById('edit-phone').value;
        orders[index].delivery_address = document.getElementById('edit-delivery_address').value;
        orders[index].delivery_date = document.getElementById('edit-delivery_date').value;
        orders[index].delivery_interval = document.getElementById('edit-delivery_interval').value;
        orders[index].comment = document.getElementById('edit-comment').value;
        localStorage.setItem('examOrders', JSON.stringify(orders));
    }
    
    showNotification(`✅ Заказ #${id} успешно изменён!`, 'success');
    document.getElementById('modal-edit').style.display = 'none';
    renderOrders();
});

// =========================
// 4. МОДАЛЬНОЕ ОКНО: УДАЛЕНИЕ
// =========================
function openDelete(id) {
    document.getElementById('delete-id').value = id;
    document.getElementById('modal-delete').style.display = 'flex';
}

document.getElementById('confirm-delete-btn').addEventListener('click', function() {
    const id = document.getElementById('delete-id').value;
    let orders = JSON.parse(localStorage.getItem('examOrders')) || [];
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem('examOrders', JSON.stringify(orders));
    
    showNotification(`🗑️ Заказ #${id} успешно удалён!`, 'info');
    document.getElementById('modal-delete').style.display = 'none';
    renderOrders();
});

// =========================
// 5. УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ
// =========================
document.querySelectorAll('.modal-close').forEach(el => {
    el.addEventListener('click', function() {
        this.closest('.modal-overlay').style.display = 'none';
    });
});
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// =========================
// 6. УВЕДОМЛЕНИЯ
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
// 7. ЗАПУСК
// =========================
document.addEventListener('DOMContentLoaded', function() {
    console.log("Запуск profile.js...");
    renderOrders();
});

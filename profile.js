/* profile.js - Личный кабинет (Исправленная версия с актуальными данными) */

// =========================
// 1. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ (Загружает свежие данные всегда)
// =========================
function getOrdersFromStorage() {
    const stored = localStorage.getItem('examOrders');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    return [];
}

// =========================
// 2. ОТРИСОВКА ТАБЛИЦЫ
// =========================
function renderOrders() {
    const tbody = document.getElementById('orders-list');
    if (!tbody) {
        console.error("Ошибка: Не найден элемент tbody с id='orders-list'");
        return;
    }

    if (typeof allGoods === 'undefined') {
        tbody.innerHTML = '<tr><td colspan="6" style="color:red; text-align:center;">Ошибка: не загружен файл goods.js</td></tr>';
        return;
    }

    // Загружаем заказы
    let orders = getOrdersFromStorage();
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px;">У вас пока нет оформленных заказов.</td></tr>';
        return;
    }

    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    let html = '';
    orders.forEach((order, index) => {
        const names = order.good_ids.map(id => {
            const g = allGoods.find(g => g.id === id);
            return g ? g.name : 'Товар удалён из каталога';
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
// 3. МОДАЛЬНОЕ ОКНО: ПРОСМОТР (Всегда берет свежие данные из storage)
// =========================
function openView(id) {
    // ВАЖНО: Загружаем данные прямо сейчас, чтобы они были точными
    const orders = getOrdersFromStorage(); 
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
// 4. МОДАЛЬНОЕ ОКНО: РЕДАКТИРОВАНИЕ
// =========================
function openEdit(id) {
    const orders = getOrdersFromStorage();
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
    // ВАЖНО: Загружаем свежие данные перед изменением
    let orders = getOrdersFromStorage();
    const index = orders.findIndex(o => o.id === id);
    
    if (index !== -1) {
        orders[index].full_name = document.getElementById('edit-full_name').value;
        orders[index].email = document.getElementById('edit-email').value;
        orders[index].phone = document.getElementById('edit-phone').value;
        orders[index].delivery_address = document.getElementById('edit-delivery_address').value;
        orders[index].delivery_date = document.getElementById('edit-delivery_date').value;
        orders[index].delivery_interval = document.getElementById('edit-delivery_interval').value;
        orders[index].comment = document.getElementById('edit-comment').value;
        
        // Сразу пересчитываем цену после редактирования (мало ли)
        let newTotal = 200;
        orders[index].good_ids.forEach(id => {
            const g = allGoods.find(g => g.id === id);
            if (g) newTotal += (g.discount_price || g.actual_price);
        });
        orders[index]._total = newTotal;

        localStorage.setItem('examOrders', JSON.stringify(orders));
    }
    
    showNotification(`✅ Заказ #${id} успешно изменён!`, 'success');
    document.getElementById('modal-edit').style.display = 'none';
    renderOrders(); // Перерисовываем таблицу
});

// =========================
// 5. МОДАЛЬНОЕ ОКНО: УДАЛЕНИЕ
// =========================
function openDelete(id) {
    document.getElementById('delete-id').value = id;
    document.getElementById('modal-delete').style.display = 'flex';
}

document.getElementById('confirm-delete-btn').addEventListener('click', function() {
    const id = document.getElementById('delete-id').value;
    
    // ВАЖНО: Загружаем свежие данные перед удалением
    let orders = getOrdersFromStorage();
    const initialLength = orders.length;
    orders = orders.filter(o => o.id !== id);
    
    if (orders.length !== initialLength) {
        localStorage.setItem('examOrders', JSON.stringify(orders));
        showNotification(`🗑️ Заказ #${id} успешно удалён!`, 'info');
        document.getElementById('modal-delete').style.display = 'none';
        renderOrders(); // Перерисовываем таблицу
    } else {
        showNotification(`❌ Ошибка: Заказ #${id} не найден.`, 'error');
        document.getElementById('modal-delete').style.display = 'none';
    }
});

// =========================
// 6. УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ
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
// 7. УВЕДОМЛЕНИЯ
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
// 8. ЗАПУСК
// =========================
document.addEventListener('DOMContentLoaded', function() {
    console.log("Запуск profile.js...");
    renderOrders();
});

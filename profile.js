/* profile.js - Версия с логированием и авто-тестом */

console.log("🚀 profile.js загружен!");

// =========================
// 1. ТЕСТОВЫЙ ЗАКАЗ (Если хранилище пустое)
// =========================
function ensureTestOrderExists() {
    let orders = JSON.parse(localStorage.getItem('examOrders')) || [];
    
    if (orders.length === 0) {
        console.log("⚠️ В хранилище нет заказов. Создаю тестовый...");
        orders.push({
            id: Date.now(),
            created_at: new Date().toISOString(),
            full_name: "Тестовый Пользователь",
            email: "test@mail.ru",
            phone: "+79991234567",
            delivery_address: "Москва, ул. Тестовая, д. 1",
            delivery_date: new Date().toISOString().slice(0, 10),
            delivery_interval: "18:00-22:00",
            comment: "Это тестовый заказ",
            good_ids: [1, 2, 5],
            _total: 500
        });
        localStorage.setItem('examOrders', JSON.stringify(orders));
        console.log("✅ Тестовый заказ создан!");
    } else {
        console.log(`📦 Найдено заказов: ${orders.length}`);
    }
}

// =========================
// 2. ФУНКЦИЯ ПОЛУЧЕНИЯ ЗАКАЗОВ
// =========================
function getOrdersFromStorage() {
    const stored = localStorage.getItem('examOrders');
    console.log("📥 Чтение localStorage:", stored);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("❌ Ошибка парсинга JSON:", e);
            return [];
        }
    }
    return [];
}

// =========================
// 3. ОТРИСОВКА ТАБЛИЦЫ
// =========================
function renderOrders() {
    const tbody = document.getElementById('orders-list');
    if (!tbody) {
        console.error("❌ Не найден tbody с id='orders-list'");
        return;
    }

    let orders = getOrdersFromStorage();
    
    if (orders.length === 0) {
        console.log("ℹ️ Заказов нет, вывожу заглушку.");
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px;">У вас пока нет оформленных заказов.</td></tr>';
        return;
    }

    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    let html = '';
    orders.forEach((order, index) => {
        const date = new Date(order.created_at);
        const dateStr = `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;

        html += `
            <tr id="row-${order.id}">
                <td>${index + 1}</td>
                <td>${dateStr}</td>
                <td>${order.good_ids.join(', ')}</td>
                <td>${order._total || 0}₽</td>
                <td>${order.delivery_date || '—'}<br>${order.delivery_interval || '—'}</td>
                <td>
                    <button class="action-btn view-btn" onclick="openView(${order.id})">👁️</button>
                    <button class="action-btn edit-btn" onclick="openEdit(${order.id})">✏️</button>
                    <button class="action-btn delete-btn" onclick="openDelete(${order.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
    console.log("🖥️ Таблица отрисована!");
}

// =========================
// 4. ПРОСМОТР
// =========================
function openView(id) {
    console.log(`👁️ Просмотр заказа #${id}`);
    const orders = getOrdersFromStorage();
    const order = orders.find(o => o.id === id);
    if (!order) {
        console.error("❌ Заказ не найден!");
        return;
    }

    const date = new Date(order.created_at);
    const dateStr = `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;

    document.getElementById('view-content').innerHTML = `
        <p><strong>Имя:</strong> ${order.full_name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Телефон:</strong> ${order.phone}</p>
        <p><strong>Адрес:</strong> ${order.delivery_address}</p>
        <p><strong>Дата:</strong> ${order.delivery_date} ${order.delivery_interval}</p>
        <p><strong>Комментарий:</strong> ${order.comment}</p>
        <p><strong>Состав ID:</strong> ${order.good_ids.join(', ')}</p>
        <p><strong>Стоимость:</strong> ${order._total}₽</p>
    `;
    document.getElementById('modal-view').style.display = 'flex';
}

// =========================
// 5. РЕДАКТИРОВАНИЕ
// =========================
function openEdit(id) {
    console.log(`✏️ Редактирование заказа #${id}`);
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
    const id = Number(document.getElementById('edit-id').value);
    console.log(`💾 Сохранение изменений для #${id}`);
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
        localStorage.setItem('examOrders', JSON.stringify(orders));
        console.log("✅ Данные сохранены:", orders[index]);
    } else {
        console.error("❌ Заказ не найден при сохранении!");
    }
    
    showNotification(`✅ Заказ #${id} успешно изменён!`, 'success');
    document.getElementById('modal-edit').style.display = 'none';
    renderOrders();
});

// =========================
// 6. УДАЛЕНИЕ
// =========================
function openDelete(id) {
    console.log(`🗑️ Попытка удаления заказа #${id}`);
    document.getElementById('delete-id').value = id;
    document.getElementById('modal-delete').style.display = 'flex';
}

document.getElementById('confirm-delete-btn').addEventListener('click', function() {
    const id = Number(document.getElementById('delete-id').value);
    console.log(`🚮 Подтверждение удаления #${id}`);
    let orders = getOrdersFromStorage();
    const beforeCount = orders.length;
    orders = orders.filter(o => o.id !== id);
    
    if (orders.length !== beforeCount) {
        localStorage.setItem('examOrders', JSON.stringify(orders));
        console.log(`✅ Заказ #${id} удален! Осталось: ${orders.length}`);
        showNotification(`🗑️ Заказ #${id} успешно удалён!`, 'info');
        document.getElementById('modal-delete').style.display = 'none';
        renderOrders();
    } else {
        console.error("❌ Заказ не найден для удаления!");
        showNotification(`❌ Ошибка: Заказ #${id} не найден.`, 'error');
    }
});

// =========================
// 7. МОДАЛЬНЫЕ ОКНА
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
// 8. УВЕДОМЛЕНИЯ
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
// 9. ЗАПУСК
// =========================
document.addEventListener('DOMContentLoaded', function() {
    console.log("🟢 Страница ЛК загружена.");
    ensureTestOrderExists();
    renderOrders();
});

/* profile.js - Личный кабинет */

// =========================
// 1. ГЕНЕРАЦИЯ ДЕМО-ЗАКАЗОВ
// =========================
function generateDemoOrders() {
    const orders = [];
    const names = ['Иванов Иван Иванович', 'Петрова Анна Сергеевна', 'Сидоров Петр Петрович'];
    const addresses = ['Москва, ул. Большая Семёновская, 38', 'Москва, ул. Тверская, д. 12', 'Москва, ул. Арбат, д. 22'];
    const intervals = ['08:00-12:00', '12:00-14:00', '14:00-18:00', '18:00-22:00'];

    for (let i = 1; i <= 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const goodsCount = Math.floor(Math.random() * 4) + 1;
        const shuffledGoods = [...allGoods].sort(() => 0.5 - Math.random()).slice(0, goodsCount);
        const goodIds = shuffledGoods.map(g => g.id);
        let total = 0;
        shuffledGoods.forEach(g => total += (g.discount_price || g.actual_price));

        const deliveryDate = new Date(date);
        deliveryDate.setDate(deliveryDate.getDate() + 3);

        orders.push({
            id: 100 + i,
            created_at: date.toISOString(),
            full_name: names[i % names.length],
            email: `user${i}@mail.ru`,
            phone: `+7999123456${i}`,
            delivery_address: addresses[i % addresses.length],
            delivery_date: deliveryDate.toISOString().slice(0, 10),
            delivery_interval: intervals[i % intervals.length],
            comment: `Комментарий к заказу #${100 + i}`,
            good_ids: goodIds,
            _total: total
        });
    }
    return orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

// =========================
// 2. ОТРИСОВКА ТАБЛИЦЫ
// =========================
function renderOrders() {
    const orders = generateDemoOrders();
    const tbody = document.getElementById('orders-list');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">У вас пока нет заказов.</td></tr>';
        return;
    }

    let html = '';
    orders.forEach((order, index) => {
        const names = order.good_ids.map(id => {
            const g = allGoods.find(g => g.id === id);
            return g ? g.name : 'Удалено';
        });
        
        const date = new Date(order.created_at);
        const dateStr = `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;

        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${dateStr}</td>
                <td>${names.join(', ')}</td>
                <td>${order._total}₽</td>
                <td>${order.delivery_date}<br>${order.delivery_interval}</td>
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
// 3. МОДАЛЬНОЕ ОКНО: ПРОСМОТР
// =========================
function openView(id) {
    const orders = generateDemoOrders();
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const names = order.good_ids.map(id => {
        const g = allGoods.find(g => g.id === id);
        return g ? g.name : 'Удалено';
    });
    const date = new Date(order.created_at);
    const dateStr = `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;

    document.getElementById('view-content').innerHTML = `
        <p><strong>Имя:</strong> ${order.full_name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Телефон:</strong> ${order.phone}</p>
        <p><strong>Адрес:</strong> ${order.delivery_address}</p>
        <p><strong>Дата доставки:</strong> ${order.delivery_date}</p>
        <p><strong>Время:</strong> ${order.delivery_interval}</p>
        <p><strong>Комментарий:</strong> ${order.comment}</p>
        <p><strong>Состав:</strong> ${names.join(', ')}</p>
        <p><strong>Стоимость:</strong> ${order._total}₽</p>
    `;
    document.getElementById('modal-view').style.display = 'flex';
}

// =========================
// 4. МОДАЛЬНОЕ ОКНО: РЕДАКТИРОВАНИЕ
// =========================
function openEdit(id) {
    const orders = generateDemoOrders();
    const order = orders.find(o => o.id === id);
    if (!order) return;

    document.getElementById('edit-id').value = order.id;
    document.getElementById('edit-full_name').value = order.full_name;
    document.getElementById('edit-email').value = order.email;
    document.getElementById('edit-phone').value = order.phone;
    document.getElementById('edit-delivery_address').value = order.delivery_address;
    document.getElementById('edit-delivery_date').value = order.delivery_date;
    document.getElementById('edit-delivery_interval').value = order.delivery_interval;
    document.getElementById('edit-comment').value = order.comment;

    document.getElementById('modal-edit').style.display = 'flex';
}

document.getElementById('save-edit-btn').addEventListener('click', function() {
    const id = document.getElementById('edit-id').value;
    showNotification(`✅ Заказ #${id} успешно изменён (эмуляция)!`, 'success');
    document.getElementById('modal-edit').style.display = 'none';
    renderOrders();
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
    showNotification(`🗑️ Заказ #${id} успешно удалён (эмуляция)!`, 'info');
    document.getElementById('modal-delete').style.display = 'none';
    renderOrders();
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
// 8. ЗАП
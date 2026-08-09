const allGoods = [
    // Электроника
    { id: 1, name: "Смартфон Apple iPhone 15", main_category: "Электроника", sub_category: "Телефоны", image_url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923768789", rating: 4.9, actual_price: 79990, discount_price: 69990, created_at: "2025-01-01T10:00:00" },
    { id: 2, name: "Ноутбук ASUS ZenBook 14", main_category: "Электроника", sub_category: "Ноутбуки", image_url: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg", rating: 4.8, actual_price: 89990, discount_price: 74990, created_at: "2025-01-02T12:00:00" },
    { id: 3, name: "Наушники Sony WH-1000XM5", main_category: "Электроника", sub_category: "Аудио", image_url: "https://m.media-amazon.com/images/I/71o8Q5X-7tL._AC_SL1500_.jpg", rating: 4.9, actual_price: 28990, discount_price: 24990, created_at: "2025-01-03T09:00:00" },
    { id: 4, name: "Умные часы Apple Watch SE", main_category: "Электроника", sub_category: "Умные гаджеты", image_url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MRE73_VW_34FR+watch-40-alum-midnight-nc-se_VW_34FR_WF_CO?wid=1400&hei=1400&fmt=jpeg&qlt=90&.v=1632171069000", rating: 4.7, actual_price: 24990, discount_price: 19990, created_at: "2025-01-04T14:00:00" },
    
    // Одежда
    { id: 5, name: "Футболка мужская Basic Black", main_category: "Одежда", sub_category: "Мужская", image_url: "https://m.media-amazon.com/images/I/71e55Np35HL._AC_SL1500_.jpg", rating: 4.3, actual_price: 1590, discount_price: 990, created_at: "2025-01-05T16:00:00" },
    { id: 6, name: "Кроссовки Nike Air Max", main_category: "Одежда", sub_category: "Спортивная", image_url: "https://m.media-amazon.com/images/I/71E+8e4i+oL._AC_SL1500_.jpg", rating: 4.8, actual_price: 12990, discount_price: 8990, created_at: "2025-01-06T08:00:00" },
    { id: 7, name: "Джинсы мужские Levi's 501", main_category: "Одежда", sub_category: "Мужская", image_url: "https://m.media-amazon.com/images/I/81qR9J2vEoL._AC_SL1500_.jpg", rating: 4.6, actual_price: 6990, discount_price: 4990, created_at: "2025-01-07T11:00:00" },
    { id: 8, name: "Куртка пуховая зимняя The North Face", main_category: "Одежда", sub_category: "Верхняя", image_url: "https://m.media-amazon.com/images/I/71mKpDgQH+L._AC_SL1500_.jpg", rating: 4.9, actual_price: 25990, discount_price: 19990, created_at: "2025-01-08T17:00:00" },
    
    // Книги
    { id: 9, name: "Книга «Выразительный JavaScript»", main_category: "Книги", sub_category: "IT", image_url: "https://m.media-amazon.com/images/I/71+Z6fz3VJL._AC_SL1000_.jpg", rating: 4.7, actual_price: 2490, discount_price: 1990, created_at: "2025-01-09T15:00:00" },
    { id: 10, name: "Книга «Алгоритмы. Построение и анализ»", main_category: "Книги", sub_category: "IT", image_url: "https://m.media-amazon.com/images/I/71Vf3HpQkCL._AC_SL1000_.jpg", rating: 4.9, actual_price: 3990, discount_price: 3490, created_at: "2025-01-10T19:00:00" },
    { id: 11, name: "Книга «Гарри Поттер и философский камень»", main_category: "Книги", sub_category: "Фантастика", image_url: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_SL1500_.jpg", rating: 4.8, actual_price: 890, discount_price: 690, created_at: "2025-01-11T06:00:00" },
    
    // Спорт
    { id: 12, name: "Гантели разборные 20 кг", main_category: "Спорт", sub_category: "Тяжелая атлетика", image_url: "https://m.media-amazon.com/images/I/71SJk9hQ16L._AC_SL1500_.jpg", rating: 4.5, actual_price: 2990, discount_price: 2490, created_at: "2025-01-12T10:00:00" },
    { id: 13, name: "Коврик для йоги Pro", main_category: "Спорт", sub_category: "Фитнес", image_url: "https://m.media-amazon.com/images/I/71J01m1Z4+L._AC_SL1500_.jpg", rating: 4.7, actual_price: 990, discount_price: 790, created_at: "2025-01-13T13:00:00" },
    { id: 14, name: "Скакалка профессиональная", main_category: "Спорт", sub_category: "Кардио", image_url: "https://m.media-amazon.com/images/I/61YcXtXWyoL._AC_SL1500_.jpg", rating: 4.3, actual_price: 490, discount_price: 390, created_at: "2025-01-14T18:00:00" },

    // Дом
    { id: 15, name: "Чайник электрический Xiaomi", main_category: "Дом", sub_category: "Кухня", image_url: "https://m.media-amazon.com/images/I/51u+W2KX5eL._AC_SL1000_.jpg", rating: 4.8, actual_price: 1990, discount_price: 1690, created_at: "2025-01-15T20:00:00" },
    { id: 16, name: "Сковорода с керамическим покрытием", main_category: "Дом", sub_category: "Кухня", image_url: "https://m.media-amazon.com/images/I/71+oF2Wc+YL._AC_SL1500_.jpg", rating: 4.4, actual_price: 1490, discount_price: 1190, created_at: "2025-01-16T09:00:00" },
    { id: 17, name: "Настольная лампа LED", main_category: "Дом", sub_category: "Освещение", image_url: "https://m.media-amazon.com/images/I/61QdT7KbH+L._AC_SL1500_.jpg", rating: 4.6, actual_price: 790, discount_price: 590, created_at: "2025-01-17T14:00:00" },
    { id: 18, name: "Пылесос беспроводный", main_category: "Дом", sub_category: "Уборка", image_url: "https://m.media-amazon.com/images/I/71R9XN4qQLL._AC_SL1500_.jpg", rating: 4.9, actual_price: 5990, discount_price: 4490, created_at: "2025-01-18T11:00:00" }
];

/* goods.js - База данных товаров для всего проекта */

const allGoods = [
    // Электроника
    { id: 1, name: "Смартфон X10 Pro", main_category: "Электроника", sub_category: "Телефоны", image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300", rating: 4.8, actual_price: 4500, discount_price: 3900, created_at: "2025-01-01T10:00:00" },
    { id: 2, name: "Ноутбук Pro 15 дюймов", main_category: "Электроника", sub_category: "Ноутбуки", image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", rating: 4.9, actual_price: 8500, discount_price: 7200, created_at: "2025-01-02T12:00:00" },
    { id: 3, name: "Наушники AirMax Pro", main_category: "Электроника", sub_category: "Аудио", image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", rating: 4.7, actual_price: 1200, discount_price: null, created_at: "2025-01-03T09:00:00" },
    { id: 4, name: "Зарядное устройство 65W", main_category: "Электроника", sub_category: "Аксессуары", image_url: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=300", rating: 4.5, actual_price: 600, discount_price: 450, created_at: "2025-01-04T14:00:00" },
    
    // Одежда
    { id: 5, name: "Футболка Basic Black", main_category: "Одежда", sub_category: "Мужская", image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300", rating: 4.2, actual_price: 250, discount_price: null, created_at: "2025-01-05T16:00:00" },
    { id: 6, name: "Кроссовки Runner Pro", main_category: "Одежда", sub_category: "Спортивная", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", rating: 4.9, actual_price: 1500, discount_price: 1200, created_at: "2025-01-06T08:00:00" },
    { id: 7, name: "Джинсы Slim Fit", main_category: "Одежда", sub_category: "Мужская", image_url: "https://images.unsplash.com/photo-1542272617-08f9c36ca2cd?w=300", rating: 4.3, actual_price: 800, discount_price: 600, created_at: "2025-01-07T11:00:00" },
    
    // Книги
    { id: 8, name: "Книга «JavaScript: полное руководство»", main_category: "Книги", sub_category: "IT", image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300", rating: 4.6, actual_price: 350, discount_price: 250, created_at: "2025-01-08T17:00:00" },
    { id: 9, name: "Книга «Алгоритмы на Python»", main_category: "Книги", sub_category: "IT", image_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300", rating: 4.8, actual_price: 400, discount_price: 350, created_at: "2025-01-09T15:00:00" },
    { id: 10, name: "Книга «Путешествие к центру Земли»", main_category: "Книги", sub_category: "Фантастика", image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300", rating: 4.1, actual_price: 200, discount_price: null, created_at: "2025-01-10T19:00:00" },
    
    // Спорт
    { id: 11, name: "Гантели 5 кг (пара)", main_category: "Спорт", sub_category: "Тяжелая атлетика", image_url: "https://images.unsplash.com/photo-1584735935682-2fdb1d4a7246?w=300", rating: 4.4, actual_price: 800, discount_price: 650, created_at: "2025-01-11T06:00:00" },
    { id: 12, name: "Коврик для йоги", main_category: "Спорт", sub_category: "Фитнес", image_url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=300", rating: 4.5, actual_price: 400, discount_price: 300, created_at: "2025-01-12T10:00:00" },
    
    // Дом
    { id: 13, name: "Сковорода 28 см", main_category: "Дом", sub_category: "Кухня", image_url: "https://images.unsplash.com/photo-1584990347449-a0846f68a0f3?w=300", rating: 4.0, actual_price: 350, discount_price: null, created_at: "2025-01-13T13:00:00" },
    { id: 14, name: "Светильник настольный LED", main_category: "Дом", sub_category: "Освещение", image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057d1e7e?w=300", rating: 4.7, actual_price: 550, discount_price: 400, created_at: "2025-01-14T18:00:00" },
    { id: 15, name: "Пылесос циклонный", main_category: "Дом", sub_category: "Уборка", image_url: "https://images.unsplash.com/photo-1558317374-153fb1e0b805?w=300", rating: 4.9, actual_price: 1200, discount_price: 950, created_at: "2025-01-15T20:00:00" },
    
    // Электроника (продолжение)
    { id: 16, name: "Планшет Tab 10", main_category: "Электроника", sub_category: "Планшеты", image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300", rating: 4.6, actual_price: 3200, discount_price: 2800, created_at: "2025-01-16T09:00:00" },
    { id: 17, name: "Умные часы Watch X", main_category: "Электроника", sub_category: "Умные гаджеты", image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", rating: 4.4, actual_price: 2000, discount_price: 1600, created_at: "2025-01-17T14:00:00" },
    { id: 18, name: "Колонка Bluetooth Boom", main_category: "Электроника", sub_category: "Аудио", image_url: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300", rating: 4.8, actual_price: 900, discount_price: 750, created_at: "2025-01-18T11:00:00" },

    // Одежда (продолжение)
    { id: 19, name: "Куртка пуховая зимняя", main_category: "Одежда", sub_category: "Верхняя", image_url: "https://images.unsplash.com/photo-1551028919-acf14e15605f?w=300", rating: 4.7, actual_price: 2800, discount_price: 2200, created_at: "2025-01-19T07:00:00" },
    { id: 20, name: "Шорты спортивные", main_category: "Одежда", sub_category: "Спортивная", image_url: "https://images.unsplash.com/photo-1516257984-b1b4d8c6b3b8?w=300", rating: 4.2, actual_price: 350, discount_price: null, created_at: "2025-01-20T16:00:00" },
    { id: 21, name: "Рубашка в клетку", main_category: "Одежда", sub_category: "Мужская", image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300", rating: 4.3, actual_price: 450, discount_price: 350, created_at: "2025-01-21T13:00:00" },

    // Книги (продолжение)
    { id: 22, name: "Книга «Война и мир»", main_category: "Книги", sub_category: "Классика", image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300", rating: 4.9, actual_price: 300, discount_price: null, created_at: "2025-01-22T18:00:00" },
    { id: 23, name: "Книга «Гарри Поттер» (сборник)", main_category: "Книги", sub_category: "Фантастика", image_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300", rating: 4.8, actual_price: 450, discount_price: 380, created_at: "2025-01-23T12:00:00" },
    
    // Спорт (продолжение)
    { id: 24, name: "Скакалка профессиональная", main_category: "Спорт", sub_category: "Кардио", image_url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=300", rating: 4.0, actual_price: 150, discount_price: null, created_at: "2025-01-24T15:00:00" },
    { id: 25, name: "Фитнес-резинки (набор)", main_category: "Спорт", sub_category: "Фитнес", image_url: "https://images.unsplash.com/photo-1598289449087-5c039c0bb3eb?w=300", rating: 4.6, actual_price: 250, discount_price: 200, created_at: "2025-01-25T09:00:00" },
    
    // Дом (продолжение)
    { id: 26, name: "Чайник электрический 1.7л", main_category: "Дом", sub_category: "Кухня", image_url: "https://images.unsplash.com/photo-1557173469-4b54b7724278?w=300", rating: 4.5, actual_price: 300, discount_price: null, created_at: "2025-01-26T10:00:00" },
    { id: 27, name: "Картина «Горы» (декор)", main_category: "Дом", sub_category: "Декор", image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300", rating: 4.3, actual_price: 200, discount_price: 150, created_at: "2025-01-27T17:00:00" },
    { id: 28, name: "Полка настенная", main_category: "Дом", sub_category: "Мебель", image_url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300", rating: 4.2, actual_price: 280, discount_price: 220, created_at: "2025-01-28T08:00:00" },
    { id: 29, name: "Термокружка 500 мл", main_category: "Дом", sub_category: "Кухня", image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300", rating: 4.7, actual_price: 180, discount_price: 140, created_at: "2025-01-29T19:00:00" },
    { id: 30, name: "Подставка для ноутбука", main_category: "Электроника", sub_category: "Аксессуары", image_url: "https://images.unsplash.com/photo-1593642702821-c8da6771f0e6?w=300", rating: 4.6, actual_price: 320, discount_price: 250, created_at: "2025-01-30T21:00:00" }
];
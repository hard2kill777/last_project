const allGoods = [
    // Электроника
    { id: 1, name: "Смартфон Apple iPhone 15", main_category: "Электроника", sub_category: "Телефоны", image_url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923768789", rating: 4.9, actual_price: 79990, discount_price: 69990, created_at: "2025-01-01T10:00:00" },
    { id: 2, name: "Ноутбук ASUS ZenBook 14", main_category: "Электроника", sub_category: "Ноутбуки", image_url: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg", rating: 4.8, actual_price: 89990, discount_price: 74990, created_at: "2025-01-02T12:00:00" },
    { id: 3, name: "Наушники Sony WH-1000XM5", main_category: "Электроника", sub_category: "Аудио", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3cQVkUJ2GHDqOc_O4rWdsgiBcBkgTFBHWEMho7Wk744uiQSUBsPNWhsbk&s=10", rating: 4.9, actual_price: 28990, discount_price: 24990, created_at: "2025-01-03T09:00:00" },
    { id: 4, name: "Умные часы Apple Watch SE", main_category: "Электроника", sub_category: "Умные гаджеты", image_url: "https://lite-mobile.ru/image/cache/catalog/import_files/a9/a9974c17b62911ef842100155db5ff28_95f88dd4b63311ef842100155db5ff28-1200x1200.jpeg", rating: 4.7, actual_price: 24990, discount_price: 19990, created_at: "2025-01-04T14:00:00" },
    
    // Одежда
    { id: 5, name: "Футболка мужская Basic Black", main_category: "Одежда", sub_category: "Мужская", image_url: "https://goods-photos.static1-sima-land.com/items/7480952/0/700-nw.jpg", rating: 4.3, actual_price: 1590, discount_price: 990, created_at: "2025-01-05T16:00:00" },
    { id: 6, name: "Кроссовки Nike Air Max", main_category: "Одежда", sub_category: "Спортивная", image_url: "https://23sneakerstore.ru/wp-content/uploads/2024/04/photo_2024-04-04_23-26-40-2.jpg", rating: 4.8, actual_price: 12990, discount_price: 8990, created_at: "2025-01-06T08:00:00" },
    { id: 7, name: "Джинсы мужские Levi's 501", main_category: "Одежда", sub_category: "Мужская", image_url: "https://www.lee-vad.ru/components/com_jshopping/files/img_products/full_005010115B27.jpg", rating: 4.6, actual_price: 6990, discount_price: 4990, created_at: "2025-01-07T11:00:00" },
    { id: 8, name: "Куртка пуховая зимняя The North Face", main_category: "Одежда", sub_category: "Верхняя", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2uE0w8tgntmV9kdcwTKR9f_0cUgeDpCh3Xqu5d2trmCEKDpM4rhFZ2Ho&s=10", rating: 4.9, actual_price: 25990, discount_price: 19990, created_at: "2025-01-08T17:00:00" },
    
    // Книги
    { id: 9, name: "Книга «Выразительный JavaScript»", main_category: "Книги", sub_category: "IT", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFUejYfJJeNFRQLjhqhE95pFVyIY3gnizei4ycW7o_YUd2BuP6tvcQoWZt&s=10", rating: 4.7, actual_price: 2490, discount_price: 1990, created_at: "2025-01-09T15:00:00" },
    { id: 10, name: "Книга «Алгоритмы. Построение и анализ»", main_category: "Книги", sub_category: "IT", image_url: "https://upload.wikimedia.org/wikipedia/ru/e/e4/Introduction_to_Algorithms_2nd_Russian_cover.jpg?utm_source=ru.wikipedia.org&utm_campaign=index&utm_content=original", rating: 4.9, actual_price: 3990, discount_price: 3490, created_at: "2025-01-10T19:00:00" },
    { id: 11, name: "Книга «Гарри Поттер и философский камень»", main_category: "Книги", sub_category: "Фантастика", image_url: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_SL1500_.jpg", rating: 4.8, actual_price: 890, discount_price: 690, created_at: "2025-01-11T06:00:00" },
    
    // Спорт
    { id: 12, name: "Гантели разборные 20 кг", main_category: "Спорт", sub_category: "Тяжелая атлетика", image_url: "https://ir.ozone.ru/s3/multimedia-j/c1000/6716961739.jpg", rating: 4.5, actual_price: 2990, discount_price: 2490, created_at: "2025-01-12T10:00:00" },
    { id: 13, name: "Коврик для йоги Pro", main_category: "Спорт", sub_category: "Фитнес", image_url: "https://img.proftren.com/product.gallery/10470/webp_original/891fb963c1da6179e451d5389578c50b9b2d2237.webp", rating: 4.7, actual_price: 990, discount_price: 790, created_at: "2025-01-13T13:00:00" },
    { id: 14, name: "Скакалка профессиональная", main_category: "Спорт", sub_category: "Кардио", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEmjPcra4HbeeXrMTQku5YMgpGYuBnoFQCr4ATBld745Ns8hspDX6bNAo&s=10", rating: 4.3, actual_price: 490, discount_price: 390, created_at: "2025-01-14T18:00:00" },

    // Дом
    { id: 15, name: "Чайник электрический Xiaomi", main_category: "Дом", sub_category: "Кухня", image_url: "https://ir.ozone.ru/s3/multimedia-b/c1000/6566588135.jpg", rating: 4.8, actual_price: 1990, discount_price: 1690, created_at: "2025-01-15T20:00:00" },
    { id: 16, name: "Сковорода с керамическим покрытием", main_category: "Дом", sub_category: "Кухня", image_url: "https://eco-skovoroda.ru/upload/iblock/b9d/DSC_0180.jpg", rating: 4.4, actual_price: 1490, discount_price: 1190, created_at: "2025-01-16T09:00:00" },
    { id: 17, name: "Настольная лампа LED", main_category: "Дом", sub_category: "Освещение", image_url: "https://ir.ozone.ru/s3/multimedia-p/c1000/6665950825.jpg", rating: 4.6, actual_price: 790, discount_price: 590, created_at: "2025-01-17T14:00:00" },
    { id: 18, name: "Пылесос беспроводный", main_category: "Дом", sub_category: "Уборка", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycpRJUgvgrTFrCpmTsFOt2GhI_vcB0oJ6STPEvinmlLdDsgPk7VaslnQ&s=10", rating: 4.9, actual_price: 5990, discount_price: 4490, created_at: "2025-01-18T11:00:00" }
];

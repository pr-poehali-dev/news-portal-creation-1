CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    author_name VARCHAR(200) NOT NULL,
    text TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    moderated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS infrastructure (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    address VARCHAR(300) NOT NULL,
    phone VARCHAR(50),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO news (title, category, excerpt, content) VALUES
('Благоустройство детской площадки завершено', 'Благоустройство', 'На территории ЖК Ботанический установлено новое современное игровое оборудование для детей всех возрастов.', 'На территории ЖК Ботанический установлено новое современное игровое оборудование для детей всех возрастов. Работы проведены в рамках программы благоустройства района.'),
('График отключения горячей воды', 'ЖКХ', 'С 25 по 28 октября будут проводиться плановые работы по обслуживанию системы водоснабжения.', 'С 25 по 28 октября будут проводиться плановые работы по обслуживанию системы водоснабжения. Просим жителей заранее подготовиться.'),
('Открытие нового магазина продуктов', 'Инфраструктура', 'В первом корпусе открылся новый продуктовый магазин с широким ассортиментом товаров.', 'В первом корпусе открылся новый продуктовый магазин с широким ассортиментом товаров. Режим работы: с 8:00 до 22:00 ежедневно.');

INSERT INTO events (title, event_date, event_time, location, description) VALUES
('День соседей', '2025-10-28', '14:00', 'Центральная площадка', 'Приглашаем всех жителей на дружескую встречу с угощениями и развлечениями для детей.'),
('Субботник', '2025-10-30', '10:00', 'Территория комплекса', 'Общий субботник по уборке придомовой территории. Инвентарь предоставляется.');

INSERT INTO announcements (title, author_name, text, status, moderated_at) VALUES
('Продам детскую коляску', 'Мария К.', 'Продаю детскую коляску в отличном состоянии, цвет серый. Цена 8000 руб.', 'approved', CURRENT_TIMESTAMP),
('Ищу няню для ребенка', 'Елена С.', 'Требуется няня для ребенка 3 лет, график 5/2, с 8 до 18. Опыт обязателен.', 'approved', CURRENT_TIMESTAMP);

INSERT INTO infrastructure (name, address, phone, category) VALUES
('Детский сад "Радуга"', 'Корпус 1', '+7 (846) 123-45-67', 'Образование'),
('Фитнес-центр "Здоровье"', 'Корпус 3', '+7 (846) 234-56-78', 'Спорт'),
('Продуктовый магазин "Пятёрочка"', 'Корпус 2', '+7 (846) 345-67-89', 'Магазины'),
('Аптека "Здравсити"', 'Корпус 1', '+7 (846) 456-78-90', 'Здоровье');
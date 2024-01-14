-- ***** Independent Tables ***** --

-- TYPES --

DROP TABLE IF EXISTS types;

CREATE TABLE types
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    DEFAULT '-', -- Type of incoming
    counter INTEGER DEFAULT 0,
    enable  INTEGER DEFAULT 1
);

INSERT INTO types (name, enable)
VALUES ('Почта', 1),
       ('E-Mail', 1),
       ('Факс', 1);

SELECT * FROM types;

-- SENDERS --

DROP TABLE IF EXISTS senders;

CREATE TABLE senders
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    DEFAULT '-', -- Sender from which document was receipt
    counter INTEGER DEFAULT 0,
    enable  INTEGER DEFAULT 1
);

INSERT INTO senders (name, enable)
VALUES ('МОН МП КК', 1),
       ('МИНОБР Р', 1),
       ('МИНПРОСВ Р', 1),
       ('ВК КЦО', 1),
       ('УМВД Р по г. Кр-ру', 1),
       ('ГУ МВД Р по КК', 1),
       ('Рособрнадзор', 1),
       ('МБУ МО г. Кр-р «Дом молодежи»', 1),
       ('УДМ МО г. Кр-р', 1),
       ('КДН ПВО', 1),
       ('АДМ ЦВО г. Кр-ра', 1),
       ('АДМ МО г. Кр-р', 1),
       ('КРО МООО «РСО»', 1),
       ('МООО «РСО»', 1),
       ('ГКУ СО КК «КР СРЦН»', 1),
       ('ГАПОУ КК «КГТК»', 1),
       ('КРОО «Единство поколений»', 1),
       ('ОСФР по КК', 1),
       ('ГБУКК ЦСО', 1),
       ('Прокуратура ЦАО', 1),
       ('МИНФИН КК', 1),
       ('ГБУК КК «ККЮБ им. И.Ф. Вараввы»', 1);

SELECT * FROM senders;


-- DIRECTORS --

DROP TABLE IF EXISTS directors;

CREATE TABLE directors
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    DEFAULT '-', -- Name of resolution director
    counter INTEGER DEFAULT 0,
    enable  INTEGER DEFAULT 1
);

INSERT INTO directors (name, enable)
VALUES ('Агабекян Р.Л.', 1),
       ('Косяков В.А.', 1),
       ('Хамидов Н.Н.', 1);

SELECT * FROM directors;

-- EXECUTORS --

DROP TABLE IF EXISTS executors;

CREATE TABLE executors
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    DEFAULT '-', -- Name of Executor
    counter INTEGER DEFAULT 0,
    enable  INTEGER DEFAULT 1
);

INSERT INTO executors (name, enable)
VALUES ('1 пр.', 1),
       ('пр. НРиНМД', 1),
       ('пр. УР', 1),
       ('пр. КО', 1),
       ('пр. Р', 1),
       ('пр. Ма', 1),
       ('Автошкола', 1),
       ('АК ДИР', 1),
       ('АК ЗАМ', 1),
       ('АК ЗАМ НМР', 1),
       ('АК ИИО', 1),
       ('АК ОПГС', 1),
       ('АК ОЭП', 1),
       ('АК ХТО', 1),
       ('ИИТИ', 1),
       ('ИПСК', 1),
       ('ИЦЭУБП', 1),
       ('к. БПиЭБ', 1),
       ('к. ГКУ', 1),
       ('к. МиВТ', 1),
       ('к. ПиМК', 1),
       ('к. РиД', 1),
       ('ОИАОиД', 1),
       ('РЦБО', 1),
       ('СОК', 1),
       ('ОК ППС', 1),
       ('БУХ', 1),
       ('УМУ', 1),
       ('СУПЦ', 1),
       ('СКА', 1),
       ('ИБЦ', 1),
       ('СК', 1);

SELECT * FROM executors;

-- ***** Dependent Tables ***** --

DROP TABLE IF EXISTS requisite;

CREATE TABLE requisite
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER DEFAULT 0, -- Sender ID
    number    TEXT DEFAULT '-',    -- Incoming number
    date      DATE DEFAULT NULL,    -- Date receipt
    FOREIGN KEY (sender_id) REFERENCES senders (id)
);

------------------------------

DROP TABLE IF EXISTS resolutions;

CREATE TABLE resolutions
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    director_id INTEGER DEFAULT 0, -- Director ID
    resolution  TEXT DEFAULT '-',    -- Resolution
    resolution_date DATE DEFAULT NULL, -- Resolution Date
    FOREIGN KEY (director_id) REFERENCES directors (id)
);

------------------------------

DROP TABLE IF EXISTS execution_executors;

CREATE TABLE execution_executors
(
    execution_id INTEGER,
    executor_id  INTEGER,
    FOREIGN KEY (execution_id) REFERENCES execution (id),
    FOREIGN KEY (executor_id) REFERENCES executors (id)
);

------------------------------

DROP TABLE IF EXISTS execution;

CREATE TABLE execution
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    date    DATE DEFAULT NULL    -- Date of receipt by executor
);

------------------------------

DROP TABLE IF EXISTS incoming;

CREATE TABLE incoming
(
    id            INTEGER PRIMARY KEY AUTOINCREMENT, -- ID of Incoming
    type_id       INTEGER DEFAULT 0,
    requisite_id  INTEGER DEFAULT 0,
    resolution_id INTEGER DEFAULT 0,
    execution_id  INTEGER DEFAULT 0,
    description   TEXT DEFAULT '-',                              -- Summary, Description of incoming
    term_control  DATE DEFAULT NULL,                              -- Term control of incoming
    complete      INTEGER DEFAULT 0,                           -- Is completed incoming
    info          TEXT DEFAULT '-'                           -- Intelligence, information of incoming
);

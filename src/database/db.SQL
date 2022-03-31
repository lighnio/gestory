/*  USERS TABLE */

CREATE TABLE IF NOT EXISTS users(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    user                VARCHAR(45) UNIQUE,
    name                VARCHAR(60),
    pass                VARCHAR(60),
    rol                 VARCHAR(15),
    mail                VARCHAR(50)

);


/* Products table  */

CREATE TABLE IF NOT EXISTS products(
    idProduct           BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    productName         VARCHAR(60),
    productDescription  TEXT NOT NULL,
    serialNumber        VARCHAR(60) UNIQUE DEFAULT (CONCAT('DRESSU-', UUID_SHORT())),
    productPrice        FLOAT,
    productCategory     VARCHAR(10),
    purchasePrice       FLOAT,
    productImage        LONGBLOB,
    productImageType    VARCHAR(10),
    productImageName    VARCHAR(50),
    productGender       VARCHAR(10)   
);

-- EXAMPLE DATA

INSERT INTO products(
    idProduct,
    productName,
    serialNumber,
    productPrice,
    productCategory,
    purchasePrice
) VALUES (
    UUID_TO_BIN(UUID()),
    'Macbook air 15',
    UUID(),
    11220.99,
    'Computer',
    10133.34
);

/* Costumers table */
CREATE TABLE IF NOT EXISTS costumers(
    costumerId              BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    costumerName            VARCHAR(60) NOT NULL DEFAULT ('N/A'),
    costumerUsername        VARCHAR(20) NOT NULL DEFAULT ('N/A'),
    costumerPassword        VARCHAR(255) NOT NULL,
    costumerMail            VARCHAR(50) NOT NULL UNIQUE DEFAULT ('N/A') ,
    costumerZipCode         VARCHAR(10) NOT NULL DEFAULT ('N/A'),
    costumerAdress          VARCHAR(50) NOT NULL DEFAULT ('N/A'),
    costumerCreditCard      INT NOT NULL DEFAULT 0,
    costumerCvvCode         INT NOT NULL DEFAULT 0,
    costumerCountry         VARCHAR(15) NOT NULL DEFAULT ('Guatemala'),
    costumerCardExpiration  VARCHAR(6) NOT NULL DEFAULT 0
);


/* SALES TABLE */

CREATE TABLE IF NOT EXISTS sales(
    idSale          BINARY(16) PRIMARY KEY NOT NULL DEFAULT(UUID_TO_BIN(UUID())),
    saleProfit      FLOAT,
    dateSale        TIMESTAMP NOT NULL DEFAULT NOW(),
    ticket          LONGBLOB NOT NULL DEFAULT ('N/A'),
    products        JSON,
    costumerId      BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
    saleTotal       FLOAT
);

INSERT INTO sales (saleProfit) VALUES (round(rand() * 100, 2));

/* Categories table */

CREATE TABLE IF NOT EXISTS categories(
    category    VARCHAR(10) NOT NULL UNIQUE
);
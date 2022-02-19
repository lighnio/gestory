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
    idProduct           BINARY(16) PRIMARY KEY,
    productName         VARCHAR(60),
    serialNumber        VARCHAR(60) UNIQUE,
    productPrice        FLOAT,
    productCategory     VARCHAR(10),
    purchasePrice       FLOAT          
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
    id                      BINARY(16) PRIMARY KEY.
    costumerName            VARCHAR(60),
    costumerUserName        VARCHAR(20),
    costumerMail            VARCHAR(50), 
    pass                    VARCHAR(25),
    costumerMail            VARCHAR(50) UNIQUE,

);

-- Query example for costumers
-- INSERT INTO costumers(id) VALUES(UUID_TO_BIN( UUID() ) );
-- SELECT BIN_TO_UUID(id) FROM costumers;
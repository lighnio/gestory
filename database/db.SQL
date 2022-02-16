/*  USERS TABLE */

/* Products table  */

CREATE TABLE IF NOT EXISTS products(
    idProduct           int PRIMARY KEY AUTO_INCREMENT,
    productName         VARCHAR(60),
    serialNumber        VARCHAR(60) UNIQUE,
    productPrice        FLOAT,
    productCategory     VARCHAR(10),
    purchasePrice       FLOAT          
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
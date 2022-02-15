CREATE TABLE IF NOT EXISTS products(
    id          
);

CREATE TABLE IF NOT EXISTS costumers(
    id              BINARY(16) PRIMARY KEY
);

-- Query example for costumers
-- INSERT INTO costumers(id) VALUES(UUID_TO_BIN( UUID() ) );
-- SELECT BIN_TO_UUID(id) FROM costumers;
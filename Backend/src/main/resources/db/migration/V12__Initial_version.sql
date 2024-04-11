CREATE TABLE addresses (
    id       SERIAL PRIMARY KEY,
    country  VARCHAR(255) NOT NULL,
    city     VARCHAR(255) NOT NULL,
    postcode VARCHAR(255) NOT NULL
);

-- CREATE TABLE organizations (
--     id          SERIAL PRIMARY KEY,
--     name        VARCHAR(255) NOT NULL,
--     currency    VARCHAR(255) NOT NULL,
--     description VARCHAR(255)
-- );

CREATE TABLE clients (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    phone       VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    address_id  INTEGER NOT NULL,
    created     TIMESTAMP DEFAULT now() NOT NULL,
    organization_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE UNIQUE INDEX clients_unique_email_phone_idx ON clients(email, phone);

-- CREATE TABLE positions (
--     id          SERIAL PRIMARY KEY,
--     name        VARCHAR(255) NOT NULL,
--     description VARCHAR(255),
--     organization_id INTEGER NOT NULL,
--     FOREIGN KEY (organization_id) REFERENCES organizations(id)
-- );

CREATE TABLE employees (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    registered      TIMESTAMP DEFAULT now() NOT NULL,
    enabled         BOOLEAN DEFAULT TRUE,
    description     VARCHAR(255),
    address_id      INTEGER,
    password        VARCHAR(255) NOT NULL,
    photo_path      VARCHAR(255) NOT NULL,
    position_id     INTEGER NOT NULL,
    organization_id INTEGER NOT NULL,
    FOREIGN KEY (position_id) REFERENCES positions(id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE UNIQUE INDEX employees_unique_email_phone_idx ON clients(email, phone);

CREATE TABLE events (
    id              SERIAL PRIMARY KEY,
    message         VARCHAR(255) NOT NULL,
    type            VARCHAR(255) NOT NULL,
    published       TIMESTAMP DEFAULT now() NOT NULL,
    publisher_id    INTEGER NOT NULL,
    organization_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    FOREIGN KEY (publisher_id) REFERENCES employees(id)
);

CREATE TABLE positions_permissions (
    position_id     INTEGER NOT NULL,
    permission      VARCHAR(255) NOT NULL,
    FOREIGN KEY (position_id) REFERENCES positions(id),
    CONSTRAINT unique_position_id_permission UNIQUE (position_id, permission)
);

CREATE TABLE categories (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image_path  VARCHAR(255) NOT NULL,
    organization_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE UNIQUE INDEX categories_unique_name_organization_id_idx ON categories(name, organization_id);

CREATE TABLE products1 (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price       NUMERIC(15, 2) NOT NULL,
    image_path  VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL,
    organization_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE UNIQUE INDEX products_unique_name_organization_id_idx ON products1(name, organization_id);

CREATE TABLE orders1 (
    id        SERIAL PRIMARY KEY,
    created   TIMESTAMP DEFAULT now() NOT NULL,
    organization_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE TABLE orders_products (
  order_id   INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders1(id),
  FOREIGN KEY (product_id) REFERENCES products1(id)
);

CREATE TABLE clients_orders (
    client_id INTEGER NOT NULL,
    order_id  INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (order_id) REFERENCES orders1(id)
);

ALTER TABLE product ADD COLUMN createdAt DATE;
ALTER TABLE product ADD COLUMN createdBy BIGINT;

ALTER TABLE product ADD CONSTRAINT fk_product_createdBy FOREIGN KEY (createdBy) REFERENCES users(id);

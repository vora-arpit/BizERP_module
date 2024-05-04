INSERT INTO role VALUES ('SUPER_ADMIN','');


ALTER TABLE organizations DROP COLUMN currency;

ALTER TABLE user_role ADD COLUMN organization_id BIGINT;

ALTER TABLE user_role ADD CONSTRAINT fk_userrole_organization FOREIGN KEY (organization_id) REFERENCES organizations(id);

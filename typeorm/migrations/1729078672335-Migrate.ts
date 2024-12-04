import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1729078672335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                totalAmount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(50) NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

    await queryRunner.query(`
            CREATE TABLE orders_products_products (
                ordersId INT,
                productsId INT UNSIGNED,
                PRIMARY KEY (ordersId, productsId),
                FOREIGN KEY (ordersId) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (productsId) REFERENCES products(id) ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE orders_products_products`);
    await queryRunner.query(`DROP TABLE orders`);
  }
}

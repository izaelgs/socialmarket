import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1728654058455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE products
            MODIFY COLUMN imgLink VARCHAR(2048)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE products
            MODIFY COLUMN imgLink VARCHAR(255)
        `);
  }
}

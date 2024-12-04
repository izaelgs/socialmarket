import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStripeAccountIdToStore1729078672336
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stores
      ADD COLUMN stripeAccountId VARCHAR(255) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stores
      DROP COLUMN stripeAccountId
    `);
  }
}

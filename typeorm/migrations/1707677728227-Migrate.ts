import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1707677728227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          { name: "birthAt", type: "date", isNullable: true },
          { name: "role", type: "int", default: 1 },
          { name: "name", type: "varchar", length: "63", isNullable: false },
          { name: "email", type: "varchar", length: "127", isUnique: true },
          {
            name: "username",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          { name: "about", type: "varchar", length: "255", isNullable: false },
          { name: "photo", type: "varchar", length: "255", isNullable: false },
          {
            name: "cover_photo",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "datetime",
            precision: 6,
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "updatedAt",
            type: "datetime",
            precision: 6,
            default: "CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}

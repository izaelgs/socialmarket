import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1708648018947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "associates",
        columns: [
          {
            name: "id",
            type: "int",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "role", type: "int", default: 1 },
          {
            name: "cpf",
            type: "varchar",
            length: "15",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "cnpj",
            type: "varchar",
            length: "20",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "user_id",
            type: "int",
            unsigned: true,
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
        foreignKeys: [
          {
            name: "FK_associates_users",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE", // Optional: Specify behavior on user deletion
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("associates");
  }
}

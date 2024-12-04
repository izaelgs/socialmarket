import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1718718561068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
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
            name: "content",
            type: "text",
            isNullable: true,
          },
          {
            name: "imageUrl",
            type: "varchar",
            length: "255",
            isNullable: true,
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
          {
            name: "referencePostId",
            type: "int",
            unsigned: true,
            isNullable: true,
          },
          {
            name: "userId",
            type: "int",
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["referencePostId"],
            referencedColumnNames: ["id"],
            referencedTableName: "posts",
            onDelete: "CASCADE",
          },
          {
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts");
  }
}

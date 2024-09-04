import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1708677728227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "stores",
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
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "displayName",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "nameLink",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "cnpj",
            type: "varchar",
            length: "20",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "state",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "city",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "category",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "imgLink",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "creatorId",
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
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "stores",
      new TableForeignKey({
        columnNames: ["creatorId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "store_associates",
        columns: [
          {
            name: "storeId",
            type: "int",
            unsigned: true,
            isPrimary: true,
          },
          {
            name: "associateId",
            type: "int",
            unsigned: true,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["storeId"],
            referencedColumnNames: ["id"],
            referencedTableName: "stores",
            onDelete: "CASCADE",
          },
          {
            columnNames: ["associateId"],
            referencedColumnNames: ["id"],
            referencedTableName: "associates",
            onDelete: "CASCADE",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("store_associates");
    await queryRunner.dropForeignKey("stores", "FK_stores_users");
    await queryRunner.dropTable("stores");
  }
}

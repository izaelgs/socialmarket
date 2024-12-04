import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1725536985634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
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
            name: "category",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "quantityAvailable",
            type: "int",
            isNullable: false,
          },
          {
            name: "rating",
            type: "decimal",
            precision: 2,
            scale: 1,
            isNullable: true,
            default: 0,
          },
          {
            name: "imgLink",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "storeId",
            type: "int",
            unsigned: true,
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true,
    );

    // Criação da foreign key para a tabela "stores"
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["storeId"],
        referencedColumnNames: ["id"],
        referencedTableName: "stores",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a foreign key
    const table = await queryRunner.getTable("products");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("storeId") !== -1,
    );
    await queryRunner.dropForeignKey("products", foreignKey);

    // Remover a tabela "products"
    await queryRunner.dropTable("products");
  }
}

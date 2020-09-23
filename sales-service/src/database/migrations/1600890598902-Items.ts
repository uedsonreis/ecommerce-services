import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Items1600890598902 implements MigrationInterface {

    private readonly tableName = 'items';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'price', type: 'float', isNullable: false },
                { name: 'amount', type: 'int', isNullable: false },
                { name: 'product_id', type: 'int', isNullable: false },
                { name: 'sales_order_id', type: 'int', isNullable: false }
            ]
        }));

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            columnNames: ['sales_order_id'], referencedColumnNames: ['id'], referencedTableName: 'sales_orders'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("sales_orders");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("sales_order_id") > -1);
        await queryRunner.dropForeignKey('sales_orders', foreignKey);
        await queryRunner.dropColumn('sales_orders', 'sales_order_id');
        await queryRunner.dropTable(this.tableName);
    }

}

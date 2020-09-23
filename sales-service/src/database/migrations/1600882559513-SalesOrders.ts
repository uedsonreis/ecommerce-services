import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SalesOrders1600882559513 implements MigrationInterface {

    private readonly tableName = 'sales_orders';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'total_value', type: 'float', isNullable: false },
                { name: 'customer_id', type: 'int', isNullable: false },
                { name: 'created_at', type: 'date', isNullable: false },
                { name: 'upated_at', type: 'date', isNullable: false }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}

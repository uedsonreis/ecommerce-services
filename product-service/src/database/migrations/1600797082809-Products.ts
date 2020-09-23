import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Products1600797082809 implements MigrationInterface {

    private readonly tableName = 'products';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar', isNullable: false },
                { name: 'price', type: 'float', isNullable: false },
                { name: 'amount', type: 'int', isNullable: false },
                { name: 'factory_id', type: 'int', isNullable: false },
            ]
        }));

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            columnNames: ['factory_id'], referencedColumnNames: ['id'], referencedTableName: 'factories'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("factories");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("factory_id") > -1);
        await queryRunner.dropForeignKey('factories', foreignKey);
        await queryRunner.dropColumn('factories', 'factory_id');
        await queryRunner.dropTable(this.tableName);
    }

}
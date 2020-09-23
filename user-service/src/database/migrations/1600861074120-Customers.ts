import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Customers1600861074120 implements MigrationInterface {

    private readonly tableName = 'customers';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar', isNullable: false },
                { name: 'email', type: 'varchar', isNullable: false },
                { name: 'age', type: 'int', isNullable: false },
                { name: 'address', type: 'varchar', isNullable: true },
                { name: 'user_id', type: 'int', isNullable: false }
            ]
        }));

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            columnNames: ['user_id'], referencedColumnNames: ['id'], referencedTableName: 'users'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") > -1);
        await queryRunner.dropForeignKey('users', foreignKey);
        await queryRunner.dropColumn('users', 'user_id');
        await queryRunner.dropTable(this.tableName);
    }

}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Users1600817389293 implements MigrationInterface {

    private readonly tableName = 'users';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'username', type: 'varchar', isUnique: true, isNullable: false },
                { name: 'password', type: 'varchar', isNullable: false },
                { name: 'admin', type: 'bool', isNullable: false },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}

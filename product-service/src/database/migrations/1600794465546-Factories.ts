import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Factories1600794571863 implements MigrationInterface {

    private readonly tableName = 'factories';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar', isNullable: false }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}

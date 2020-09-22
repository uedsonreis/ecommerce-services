import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'factories' })
export class Factory {

    @PrimaryGeneratedColumn()
    public id!: number;

    @PrimaryColumn()
    public name!: string;

}
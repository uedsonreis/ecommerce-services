import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'factories' })
export class Factory {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

}
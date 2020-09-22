import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, TableForeignKey } from 'typeorm';

import { Factory } from './factory';

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public price!: number;

    @Column()
    public amount!: number;

    @Column({ name: 'factory_id' })
    public factoryId!: number

    @ManyToOne(() => Factory)
    @JoinColumn({ name: 'factory_id' })
    public factory!: Factory;

}
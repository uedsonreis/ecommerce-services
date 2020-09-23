import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, TableForeignKey, UpdateDateColumn } from 'typeorm';

@Entity('sales_orders')
export class SalesOrder {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ name: 'total_value' })
    public totalValue!: number;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date = new Date();

    @UpdateDateColumn({ name: 'upated_at' })
    public upatedAt: Date = new Date();

    @Column({ name: 'customer_id' })
    public customerId!: number;

}
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, TableForeignKey, UpdateDateColumn } from 'typeorm';
import { SalesOrder } from './sales.order';

@Entity('items')
export class Item {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public price!: number;

    @Column()
    public amount!: number;

    @Column({ name: 'product_id' })
    public productId!: number;

    @Column({ name: 'sales_order_id' })
    public salesOrderId!: number

    @ManyToOne(() => SalesOrder)
    @JoinColumn({ name: 'sales_order_id' })
    public salesOrder!: SalesOrder;

}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/user.entity';

@Entity('customers')
export class Customer {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public email!: string;

    @Column()
    public age!: number;

    @Column({ name: 'user_id' })
    public userId!: number

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    public user!: User;

}
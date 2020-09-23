import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, TableForeignKey } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ unique: true })
    public username!: string;

    @Column()
    public password!: string;

    @Column()
    public admin!: boolean;

}
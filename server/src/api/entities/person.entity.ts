import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Todo} from "./todo.entity";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: 'varchar', length: 120})
    public username: string;

    @Column({type: 'varchar', length: 120})
    public email: string;

    @Column({type: 'varchar', length: 120})
    public password: string;

    @OneToMany(() => Todo, (note) => note.person)
    public todos: Todo[];
}
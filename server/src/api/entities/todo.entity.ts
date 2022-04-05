import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Person} from "./person.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: 'varchar', length: 120})
    public text: string;

     @Column({type: 'varchar', length: 120})
     public category: string;

    @Column({type: 'varchar', length: 120})
    public dueDate: string;

    @Column({type: 'boolean'})
    public done: boolean;

    @ManyToOne(() => Person, (person) => person.todos)
    person: Person;
}

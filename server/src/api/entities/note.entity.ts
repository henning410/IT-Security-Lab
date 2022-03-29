import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Person} from "./user.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: 'varchar', length: 120})
    public note: string;

     @Column({type: 'varchar', length: 120})
     public category: string;

    @Column({type: 'varchar', length: 120})
    public dueDate: string;

    @ManyToOne(() => Person, (user) => user.notes)
    person: Person;
}

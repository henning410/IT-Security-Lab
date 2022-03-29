import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Note} from "./note.entity";

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

    @OneToMany(() => Note, (note) => note.person)
    public notes: Note[];
}
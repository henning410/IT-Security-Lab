import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Note} from "../entities/note.entity";
import {Repository, UpdateResult} from "typeorm";
import {Person} from "../entities/user.entity";

@Injectable()
export class NoteService {
    @InjectRepository(Note)
    private readonly repository: Repository<Note>;

    public getNotesByUser(id: number): Promise<Note[]> {
        return this.repository.query('SELECT *  FROM note WHERE "personId" = ' + id + 'ORDER BY id ASC');
    }

    public changeState(id: number, currentState: boolean): Promise<UpdateResult> {
        return this.repository.createQueryBuilder()
            .update(Note)
            .set({done: !currentState})
            .where("id = :id", {id: id})
            .execute();
    }

    public delete(id: number) {
        return this.repository.createQueryBuilder()
            .delete()
            .from(Note)
            .where("id = :id", { id: id })
            .execute();
    }

    public add(category: string, note: string, dueDate: string) {
        let person = new Person();
        person.id = 1;
        return this.repository.createQueryBuilder()
            .insert()
            .into(Note)
            .values([
                { category: category, note: note, dueDate: dueDate, done: false, person: person},
            ])
            .execute();
    }
}

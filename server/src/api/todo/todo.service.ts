import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "../entities/todo.entity";
import {Repository, SelectQueryBuilder, UpdateResult} from "typeorm";
import {Person} from "../entities/person.entity";

@Injectable()
export class TodoService {
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>;

    public getNotesByUser(id: number): Promise<Todo[]> {
        return this.repository.query('SELECT *  FROM todo WHERE "personId" = ' + id + 'ORDER BY id ASC');
    }

    public async getNotesByCategoryAndUser(userId: number, category: string)  {
        const todosByCategory = await this.repository.query('SELECT *  FROM todo WHERE category = ' + category);
        return todosByCategory.filter(todo => todo.personId == userId);
    }

    public changeState(id: number, currentState: boolean): Promise<UpdateResult> {
        return this.repository.createQueryBuilder()
            .update(Todo)
            .set({done: !currentState})
            .where("id = :id", {id: id})
            .execute();
    }

    public delete(id: number) {
        return this.repository.createQueryBuilder()
            .delete()
            .from(Todo)
            .where("id = :id", { id: id })
            .execute();
    }

    public add(category: string, text: string, dueDate: string, personID: number) {
        const person = new Person();
        person.id = personID;
        return this.repository.createQueryBuilder()
            .insert()
            .into(Todo)
            .values([
                { category: category, text: text, dueDate: dueDate, done: false, person: person},
            ])
            .execute();
    }
}

import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "../entities/todo.entity";
import {Repository, UpdateResult} from "typeorm";
import {Person} from "../entities/person.entity";

@Injectable()
export class TodoService {
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>;

    public getTodosByUser(id: number): Promise<Todo[]> {
        return this.repository.query('SELECT *  FROM todo WHERE "personId" = ' + id + 'ORDER BY id ASC');
    }

    public async getTodosByCategoryAndUser(userId: number, category: any)  {
        const sql = 'SELECT *  FROM todo WHERE category =' + "'" + category + "'" + ' AND "personId" = ' + userId;
        return await this.repository.query(sql);
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

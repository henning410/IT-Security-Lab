import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {InsertResult, Repository} from 'typeorm';
import {Person} from '../entities/person.entity';

@Injectable()
export class PersonService {
    @InjectRepository(Person)
    private readonly repository: Repository<Person>;

    public getUser(id: any): Promise<Person> {
        return this.repository.query('SELECT *  FROM person WHERE id = ' + id);
    }

    public getAllUsers(): Promise<Person[]> {
        return this.repository.query('SELECT *  FROM person');
    }

    public login(username: any, password: any) {
        const sql = 'SELECT * FROM person WHERE username =' + "'" + username + "'" + ' AND password =' + "'" + password + "'";
        return this.repository.query(sql);
    }

    public getUserByName(username: string): Promise<Person> {
        return this.repository.createQueryBuilder("person").where("person.username = :username", {username: username}).getOne();
    }

    public createUser(body: Person): Promise<InsertResult> {
        return this.repository.createQueryBuilder()
            .insert()
            .into(Person)
            .values({ username: body.username, email: body.email, password: body.password })
            .execute();
    }
}

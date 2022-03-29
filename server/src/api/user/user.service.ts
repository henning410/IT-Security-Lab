import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Person} from '../entities/user.entity';

@Injectable()
export class UserService {
    @InjectRepository(Person)
    private readonly repository: Repository<Person>;

    public getUser(id: any): Promise<Person> {
        return this.repository.query('SELECT *  FROM person WHERE id = ' + id);
    }

    public getAllUsers(): Promise<Person[]> {
        return this.repository.query('SELECT *  FROM person');
    }

    public getUserByName(username: string): Promise<Person> {
        return this.repository.createQueryBuilder("person").where("person.username = :username", {username: username}).getOne();
    }

    public getPassword(username: string): Promise<Person> {
        return this.repository.createQueryBuilder("person")
            .select("person.password")
            .from(Person, "users")
            .where("person.username = :username", {username: username})
            .getRawOne();
    }

    public createUser(body: Person): Promise<Person> {
        const user: Person = new Person();
        user.username = body.username;
        user.email = body.email;
        return this.repository.save(user);
    }
}

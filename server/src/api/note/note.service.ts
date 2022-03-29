import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Note} from "../entities/note.entity";
import {Repository} from "typeorm";

@Injectable()
export class NoteService {
    @InjectRepository(Note)
    private readonly repository: Repository<Note>;

    public getNotesByUser(id: number): Promise<Note[]> {
        return this.repository.query('SELECT *  FROM note WHERE "personId" = ' + id);
    }
}

import {Controller, Delete, Get, Inject, Put, Query} from '@nestjs/common';
import {NoteService} from "./note.service";
import {Note} from "../entities/note.entity";
import {UpdateResult} from "typeorm";

@Controller('note')
export class NoteController {
    @Inject(NoteService)
    private readonly service: NoteService;

    @Get()
    public getNotesByUser(@Query('id') id: number): Promise<Note[]> {
        return this.service.getNotesByUser(id);
    }

    @Put()
    public changeState(@Query('id') id: number, @Query('state') currentState: boolean): Promise<UpdateResult> {
        return this.service.changeState(id, currentState);
    }

    @Delete()
    public delete(@Query('id') id: number) {
        return this.service.delete(id);
    }
}

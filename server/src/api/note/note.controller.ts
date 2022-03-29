import {Controller, Get, Inject, Query} from '@nestjs/common';
import {NoteService} from "./note.service";
import {Note} from "../entities/note.entity";

@Controller('note')
export class NoteController {
    @Inject(NoteService)
    private readonly service: NoteService;

    @Get()
    public getNotesByUser(@Query('id') id: number): Promise<Note[]> {
        return this.service.getNotesByUser(id);
    }
}

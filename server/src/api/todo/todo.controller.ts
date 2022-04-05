import {Body, Controller, Delete, Get, Inject, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {TodoService} from "./todo.service";
import {Todo} from "../entities/todo.entity";
import {UpdateResult} from "typeorm";
import {Person} from "../entities/person.entity";

@Controller('todo')
export class TodoController {
    @Inject(TodoService)
    private readonly service: TodoService;

    @Get()
    public getTodosByUser(@Query('id') id: number): Promise<Todo[]> {
        return this.service.getNotesByUser(id);
    }

    @Get('/category')
    public getTodosByCategoryAndUser(@Query('userId') id: number, @Query('category') category: string) {
        return this.service.getNotesByCategoryAndUser(id, category);
    }

    @Put()
    public changeState(@Query('id') id: number, @Query('state') currentState: boolean): Promise<UpdateResult> {
        return this.service.changeState(id, currentState);
    }

    @Post('/create')
    public addTodo(@Body() todo: any) {
        return this.service.add(todo.category, todo.text, todo.dueDate, todo.personId);
    }

    @Delete()
    public delete(@Query('id') id: number) {
        return this.service.delete(id);
    }
}

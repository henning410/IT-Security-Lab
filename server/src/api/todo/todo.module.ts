import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Person} from "../entities/person.entity";
import {Todo} from "../entities/todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}

import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PersonModule, TodoModule]
})
export class ApiModule {}

import { Module } from '@nestjs/common';
import { PersonModule } from './user/person.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PersonModule, TodoModule]
})
export class ApiModule {}

import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { PersonService } from './person.service';
import { Logger } from '@nestjs/common';
import {InsertResult} from "typeorm";

@Controller('person')
export class PersonController {
    @Inject(PersonService)
    private readonly service: PersonService;

    @Get()
    public getUser(@Query('id') id: any): Promise<Person> {
        return this.service.getUser(id);
    }

    @Get('getAll')
    public getAllUser(): Promise<Person[]> {
        return this.service.getAllUsers();
    }

    @Get('getByName')
    public getUserByName(@Query('username') username: string): Promise<Person> {
        return this.service.getUserByName(username);
    }

    @Get('login')
    public async login(@Query('password') password: string, @Query('username') username: string) {
        return this.service.login(username, password);
    }

    @Post()
    public createUser(@Body() body: any): Promise<InsertResult> {
        console.log('HIER', body);
        return this.service.createUser(body);
    }
}

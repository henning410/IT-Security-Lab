import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import { Person } from '../entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';
import {InsertResult} from "typeorm";

@Controller('user')
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

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
    public async login(@Query('password') password: string, @Query('username') username: string): Promise<boolean> {
        let passwordFromDB = "";
        if (await this.service.getPassword(username)) {
            passwordFromDB = (await this.service.getPassword(username)).password;
        }
        return password == passwordFromDB;
    }

    @Post()
    public createUser(@Body() body: any): Promise<InsertResult> {
        console.log('HIER', body);
        return this.service.createUser(body);
    }
}

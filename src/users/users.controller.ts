import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './users.service';
import { CreateUserDTO } from './users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/api/users')
  save_user(@Body() body: CreateUserDTO, @Res() response: Response) {
    this.userService.createUser(body);
    response.status(HttpStatus.CREATED).send('created successfully!');
  }
}

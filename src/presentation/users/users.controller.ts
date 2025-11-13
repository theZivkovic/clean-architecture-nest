import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import type { CreateUserRequestDto } from './users.dtos'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.usersService.createUser(createUserRequestDto)
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId)
  }
}

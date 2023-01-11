import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { users as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(
    @Body() data: { name: string; email: string },
  ): Promise<UserModel> {
    return await this.userService.createUser(data);
  }

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users();
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserModel,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}

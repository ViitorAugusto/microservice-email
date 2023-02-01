import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdatePatchUserDto } from './userDto/update-patch-user.dto';
import { UpdateUserDto } from './userDto/update-put-user.dto';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return createUser;
  }
  @Put(':id')
  async replaceUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() replaceUser: UpdateUserDto,
  ) {
    return {
      method: 'PUT',
      replaceUser,
      id,
    };
  }
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdatePatchUserDto,
  ) {
    return {
      method: 'PATCH',
      updateUser,
      id,
    };
  }

  @Get()
  async list() {
    return { user: [] };
  }
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'GET',
      id,
    };
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'DELETE',
      id,
    };
  }
}

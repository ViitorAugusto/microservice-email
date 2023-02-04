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
  UseInterceptors,
} from '@nestjs/common';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdatePatchUserDto } from './userDto/update-patch-user.dto';
import { UpdateUserDto } from './userDto/update-put-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseInterceptors(LogInterceptor)
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }
  @Get()
  async list() {
    return this.userService.list();
  }
  @Get(':id')
  async showUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.showUser(id);
  }
  @Put(':id')
  async replaceUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() replaceUser: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, replaceUser);
  }
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdatePatchUserDto,
  ) {
    return this.userService.updateUserPartial(id, updateUser);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

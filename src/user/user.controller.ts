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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdatePatchUserDto } from './userDto/update-patch-user.dto';
import { UpdateUserDto } from './userDto/update-put-user.dto';

@UseGuards(ThrottlerModule, AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.Admin)
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async showUser(@Param('id') id: number) {
    return this.userService.showUser(id);
  }
  @Roles(Role.Admin)
  @Put(':id')
  async replaceUser(@ParamId() id: number, @Body() replaceUser: UpdateUserDto) {
    return this.userService.updateUser(id, replaceUser);
  }

  @Patch(':id')
  async updateUser(
    @ParamId() id: number,
    @Body() updateUser: UpdatePatchUserDto,
  ) {
    return this.userService.updateUserPartial(id, updateUser);
  }
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

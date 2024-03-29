import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdatePatchUserDto } from './userDto/update-patch-user.dto';
import { UpdateUserDto } from './userDto/update-put-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.prisma.user.create({
      data,
    });
  }
  async list() {
    return this.prisma.user.findMany();
  }
  async showUser(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
  }
  async updateUser(
    id: number,
    { email, name, password, birtAt, bio, role }: UpdateUserDto,
  ) {
    await this.exists(id);
    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        bio,
        birtAt: birtAt ? new Date(birtAt) : null,
        role,
      },
      where: {
        id,
      },
    });
  }
  async updateUserPartial(id: number, data: UpdatePatchUserDto) {
    await this.exists(id);
    if (data.birtAt) {
      data.birtAt = new Date(data.birtAt);
    }
    console.log({ data });
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async exists(id: number) {
    //
    console.log(typeof id);
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Usuario ${id} não encontrado`);
    }
  }
}

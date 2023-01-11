import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { users, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    return this.prisma.users.create({
      data,
    });
  }

  async user(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(): Promise<users[]> {
    return this.prisma.users.findMany();
  }

  async updateUser(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<users> {
    return this.prisma.users.delete({
      where,
    });
  }
}

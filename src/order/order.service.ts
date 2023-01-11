import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, orders } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: Prisma.ordersCreateInput): Promise<orders> {
    return this.prisma.orders.create({
      data,
    });
  }
}

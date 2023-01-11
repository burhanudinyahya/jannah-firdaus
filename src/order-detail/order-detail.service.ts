import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, order_details } from '@prisma/client';

@Injectable()
export class OrderDetailService {
  constructor(private prisma: PrismaService) {}

  async createOrderDetail(
    data: Prisma.order_detailsCreateInput,
  ): Promise<order_details> {
    return this.prisma.order_details.create({
      data,
    });
  }
}

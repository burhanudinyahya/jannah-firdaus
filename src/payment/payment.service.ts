import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, payments } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(data: Prisma.paymentsCreateInput): Promise<payments> {
    return this.prisma.payments.create({
      data,
    });
  }
}

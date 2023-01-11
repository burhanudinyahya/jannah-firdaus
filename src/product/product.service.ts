import { Injectable } from '@nestjs/common';
import { Prisma, products } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async product(
    productsWhereUniqueInput: Prisma.productsWhereUniqueInput,
  ): Promise<products | null> {
    return this.prisma.products.findUnique({
      where: productsWhereUniqueInput,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.productsWhereUniqueInput;
    where?: Prisma.productsWhereInput;
    orderBy?: Prisma.productsOrderByWithRelationInput;
  }): Promise<products[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.products.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProduct(data: Prisma.productsCreateInput): Promise<products> {
    return this.prisma.products.create({
      data,
    });
  }

  async updateProduct(params: {
    where: Prisma.productsWhereUniqueInput;
    data: Prisma.productsUpdateInput;
  }): Promise<products> {
    const { data, where } = params;
    return this.prisma.products.update({
      data,
      where,
    });
  }
}

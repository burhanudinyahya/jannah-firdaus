import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { products as ProductModel } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<ProductModel[]> {
    return this.productService.products({
      where: {
        NOT: {
          stock: 0,
        },
      },
    });
  }

  @Post()
  async createProduct(
    @Body() data: { name: string; price: number; stock: number },
  ): Promise<ProductModel> {
    return await this.productService.createProduct(data);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: { name: string; price: number; stock: number },
  ): Promise<ProductModel> {
    return this.productService.updateProduct({
      where: { id: Number(id) },
      data,
    });
  }
}

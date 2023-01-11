import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { orders as OrderModel } from '@prisma/client';
import { OrderService } from './order.service';
import { PaymentService } from 'src/payment/payment.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { ProductService } from 'src/product/product.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
    private readonly orderDetailService: OrderDetailService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createOrder(
    @Body()
    data: {
      product_id: number;
      qty: number;
      note: string | null;
      method: 'TRANSFER';
      user_id: number;
    },
  ): Promise<OrderModel | string> {
    // check stock
    const product = await this.productService.product({
      id: Number(data.product_id),
    });

    if (product.stock <= 0)
      throw new HttpException('Product out of Stock', HttpStatus.NOT_FOUND);

    const totalOrder: number = Number(product.price) * Number(data.qty);

    const order = await this.orderService.createOrder({
      order_date: new Date(),
      total: totalOrder,
      note: data.note,
      user: {
        connect: {
          id: data.user_id,
        },
      },
    });

    if (order.id) {
      this.orderDetailService.createOrderDetail({
        orders: {
          connect: {
            id: order.id,
          },
        },
        products: {
          connect: {
            id: product.id,
          },
        },
        price: product.price,
        qty: data.qty,
      });

      this.paymentService.createPayment({
        payment_date: new Date(),
        payment_method: data.method,
        total: totalOrder,
        orders: {
          connect: {
            id: order.id,
          },
        },
      });

      // update stock
      this.productService.updateProduct({
        where: {
          id: product.id,
        },
        data: {
          stock: Number(product.stock) - Number(data.qty),
        },
      });
    }

    return order;
  }
}

import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductService } from 'src/product/product.service';
import { PaymentService } from 'src/payment/payment.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';

@Module({
  providers: [OrderService, ProductService, PaymentService, OrderDetailService],
  controllers: [OrderController],
})
export class OrderModule {}

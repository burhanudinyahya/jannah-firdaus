import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { OrderDetailModule } from './order-detail/order-detail.module';

@Module({
  imports: [UserModule, PrismaModule, ProductModule, OrderModule, PaymentModule, OrderDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

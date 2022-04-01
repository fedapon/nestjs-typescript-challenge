import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from '../sales/models/agent.entity';
import { Customer } from '../sales/models/customer.entity';
import { Order } from '../sales/models/order.entity';
import { AgentController } from './controllers/agent/agent.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { OrderController } from './controllers/order/order.controller';
import { AgentService } from './services/agent/agent.service';
import { CustomerService } from './services/customer/customer.service';
import { OrderService } from './services/order/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Customer, Order])],
  controllers: [AgentController, CustomerController, OrderController],
  providers: [AgentService, CustomerService, OrderService],
})
export class SalesModule {}

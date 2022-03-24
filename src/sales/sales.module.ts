import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agent/agent.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { OrderController } from './controllers/order/order.controller';
import { AgentService } from './services/agent/agent.service';
import { CustomerService } from './services/customer/customer.service';
import { OrderService } from './services/order/order.service';

@Module({
  controllers: [AgentController, CustomerController, OrderController],
  providers: [AgentService, CustomerService, OrderService],
})
export class SalesModule {}

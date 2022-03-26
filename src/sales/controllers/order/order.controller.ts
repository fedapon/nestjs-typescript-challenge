import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Order } from 'src/sales/models/order.entity';
import { OrderService } from 'src/sales/services/order/order.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('total-amount-by-customer')
  async totalAmoutByCustomer() {
    return await this.orderService.totalAmountByCustomer();
  }

  @Get('/')
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':ordNum')
  async findById(@Param('ordNum') ordNum: number) {
    const data = await this.orderService.findOneById(ordNum);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':ordNum')
  async update(
    @Param('ordNum') ordNum: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    return this.orderService.update(ordNum, updateOrderDto);
  }

  @Delete(':ordNum')
  async delete(@Param('ordNum') ordNum: number): Promise<DeleteResult> {
    return this.orderService.delete(ordNum);
  }
}

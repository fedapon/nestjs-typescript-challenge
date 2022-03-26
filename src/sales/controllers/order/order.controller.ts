import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Order } from 'src/sales/models/order.entity';
import { OrderService } from 'src/sales/services/order/order.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import salesConstants from 'src/constants/sales.constants';
import { Request } from 'express';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('total-amount-by-customer')
  async totalAmoutByCustomer() {
    return await this.orderService.totalAmountByCustomer();
  }

  @Get('total-amount-by-agent')
  async totalAmoutByAgent() {
    return await this.orderService.totalAmountByAgent();
  }

  @Get('total-amount-by-country')
  async totalAmoutByCountry() {
    return await this.orderService.totalAmountByCountry();
  }

  @Get('/')
  async findAll(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: 1,
  ): Promise<Pagination<Order>> {
    const route = `${req.protocol}://${req.hostname}:${process.env.PORT}${req.path}`;
    return this.orderService.findAll({
      page,
      limit: salesConstants.PAGINATION_ITEMS_PER_PAGE,
      route,
    });
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

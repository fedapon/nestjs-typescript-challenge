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
import { Order } from '../../models/order.entity';
import { OrderService } from '../../services/order/order.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import salesConstants from '../../../constants/sales.constants';
import { Request } from 'express';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiExtraModels(Order)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Get total amount of orders group by customer' })
  @Get('total-amount-by-customer')
  async totalAmoutByCustomer() {
    return await this.orderService.totalAmountByCustomer();
  }

  @Get('total-amount-by-agent')
  @ApiOperation({ summary: 'Get total amount of orders group by agent' })
  async totalAmoutByAgent() {
    return await this.orderService.totalAmountByAgent();
  }

  @Get('total-amount-by-country')
  @ApiOperation({ summary: 'Get total amount of orders group by country' })
  async totalAmoutByCountry() {
    return await this.orderService.totalAmountByCountry();
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all orders (paginated)' })
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
  @ApiOperation({ summary: 'Get an order by ordNum' })
  async findById(@Param('ordNum') ordNum: number) {
    const data = await this.orderService.findOneById(ordNum);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':ordNum')
  @ApiOperation({ summary: 'Update an existing order' })
  async update(
    @Param('ordNum') ordNum: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    return this.orderService.update(ordNum, updateOrderDto);
  }

  @Delete(':ordNum')
  @ApiOperation({ summary: 'Delete an existing order by its ordNum' })
  async delete(@Param('ordNum') ordNum: number): Promise<DeleteResult> {
    return this.orderService.delete(ordNum);
  }
}

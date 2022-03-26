import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/sales/controllers/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/sales/controllers/order/dto/update-order.dto';
import { Customer } from 'src/sales/models/customer.entity';
import { Order } from 'src/sales/models/order.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  async findAll(): Promise<Order[] | undefined> {
    return this.repository.find({
      relations: ['agentCode', 'custCode'],
    });
  }

  async findOneById(ordNum: number): Promise<Order | undefined> {
    return this.repository.findOne({
      where: {
        ordNum,
      },
      relations: ['agentCode', 'custCode'],
    });
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order: Order = await this.repository.create(createOrderDto);
    return await this.repository.save(order);
  }

  async update(
    ordNum: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    return this.repository.update(ordNum, updateOrderDto);
  }

  async delete(ordNum: number): Promise<DeleteResult> {
    return this.repository.delete(ordNum);
  }

  async totalAmountByCustomer(): Promise<any> {
    return await this.repository
      .createQueryBuilder('orders')
      .select('orders.cust_code', 'custCode')
      .addSelect('SUM(orders.ord_amount)', 'totalOrdAmount')
      .groupBy('orders.cust_code')
      .getRawMany();
  }

  async totalAmountByAgent(): Promise<any> {
    return await this.repository
      .createQueryBuilder('orders')
      .select('orders.agent_code', 'agentCode')
      .addSelect('SUM(orders.ord_amount)', 'totalOrdAmount')
      .groupBy('orders.agent_code')
      .getRawMany();
  }

  async totalAmountByCountry(): Promise<any> {
    return await this.repository
      .createQueryBuilder('orders')
      .leftJoin(Customer, 'customer', 'orders.cust_code = customer.cust_code')
      .select('customer.cust_country', 'custCountry')
      .addSelect('SUM(orders.ord_amount)', 'totalOrdAmount')
      .groupBy('customer.cust_country')
      .getRawMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/sales/controllers/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/sales/controllers/customer/dto/update-customer.dto';
import { Customer } from 'src/sales/models/customer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[] | undefined> {
    return this.repository.find({
      relations: ['agentCode'],
    });
  }

  async findOneById(custCode): Promise<Customer | undefined> {
    return this.repository.findOne({
      where: {
        custCode,
      },
      relations: ['agentCode'],
    });
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer: Customer = await this.repository.create(createCustomerDto);
    return await this.repository.save(customer);
  }

  async update(
    custCode,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<UpdateResult> {
    return this.repository.update(custCode, updateCustomerDto);
  }

  async delete(custCode: string): Promise<DeleteResult> {
    return this.repository.delete(custCode);
  }
}

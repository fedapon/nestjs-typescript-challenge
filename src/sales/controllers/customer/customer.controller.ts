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
import { Customer } from '../../models/customer.entity';
import { CustomerService } from '../../services/customer/customer.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(':custCode')
  async findById(@Param('custCode') custCode: string) {
    const data = await this.customerService.findOneById(custCode);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Patch(':custCode')
  async update(
    @Param('custCode') custCode: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<UpdateResult> {
    return this.customerService.update(custCode, updateCustomerDto);
  }

  @Delete(':custCode')
  async delete(@Param('custCode') custCode: string): Promise<DeleteResult> {
    return this.customerService.delete(custCode);
  }
}

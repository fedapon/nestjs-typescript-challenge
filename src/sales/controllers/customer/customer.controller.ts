import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Customer } from '../../models/customer.entity';
import { CustomerService } from '../../services/customer/customer.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../auth/guards/jwt-auth.guard';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'Get an array with all customers',
    schema: {
      example: [
        {
          custCode: 'C00001',
          custName: 'Charles',
          custCity: 'New York',
          workingArea: 'New York',
          custCountry: 'USA',
          grade: 2,
          openingAmt: '3000.00',
          receiveAmt: '500.00',
          paymentAmt: '2000.00',
          outstandingAmt: '6000.00',
          phoneNo: '077-12345674',
          agentCode: {
            agentCode: 'A001',
            agentName: 'Jhon Smith',
            workingArea: 'London',
            commission: '0.10',
            phoneNo: '077-12345674',
            country: 'USA',
          },
        },
      ],
    },
  })
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(':custCode')
  @ApiOperation({ summary: 'Get customer by custCode with its agent' })
  @ApiResponse({
    status: 200,
    description: 'Customer data by custCode',
    schema: {
      example: {
        custCode: 'C00001',
        custName: 'Charles',
        custCity: 'New York',
        workingArea: 'New York',
        custCountry: 'USA',
        grade: 2,
        openingAmt: '3000.00',
        receiveAmt: '500.00',
        paymentAmt: '2000.00',
        outstandingAmt: '6000.00',
        phoneNo: '077-12345674',
        agentCode: {
          agentCode: 'A001',
          agentName: 'Jhon Smith',
          workingArea: 'London',
          commission: '0.10',
          phoneNo: '077-12345674',
          country: 'USA',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Not Found',
      },
    },
  })
  async findById(@Param('custCode') custCode: string) {
    const data = await this.customerService.findOneById(custCode);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: 201,
    description: 'Customer successfully created',
    schema: {
      example: {
        custCode: 'C00001',
        custName: 'Charles',
        custCity: 'New York',
        workingArea: 'New York',
        custCountry: 'USA',
        grade: 2,
        openingAmt: '3000',
        receiveAmt: '500',
        paymentAmt: '2000',
        outstandingAmt: '6000',
        phoneNo: '077-12345674',
        agentCode: 'A001',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Customer failed to be created due to wrong parameters format',
    schema: {
      example: {
        statusCode: 400,
        message: ['receiveAmt is not a valid decimal number.'],
        error: 'Bad Request',
      },
    },
  })
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Patch(':custCode')
  @ApiOperation({ summary: 'Update an existing customer' })
  @ApiBody({ type: UpdateCustomerDto })
  @ApiResponse({
    status: 200,
    description: 'Customer successfully updated',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Customer failed to be updated due to wrong parameters format',
    schema: {
      example: {
        statusCode: 400,
        message: ['receiveAmt is not a valid decimal number.'],
        error: 'Bad Request',
      },
    },
  })
  async update(
    @Param('custCode') custCode: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<UpdateResult> {
    return this.customerService.update(custCode, updateCustomerDto);
  }

  @Delete(':custCode')
  @ApiOperation({ summary: 'Delete an existing customer by its custCode' })
  @ApiResponse({
    status: 200,
    description: 'Customer successfully deleted',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Customer was not deleted because forein key constraint',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async delete(@Param('custCode') custCode: string): Promise<DeleteResult> {
    return this.customerService.delete(custCode);
  }
}

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/sales/controllers/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/sales/controllers/customer/dto/update-customer.dto';
import { Customer } from '../../models/customer.entity';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let customerService: CustomerService;

  const mockCustomerRepository = {
    find: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([]))
      .mockImplementationOnce(() => Promise.resolve([{ custCode: 'C00001' }]))
      .mockImplementationOnce(() =>
        Promise.resolve([{ custCode: 'C00001' }, { custCode: 'C00002' }]),
      ),
    findOne: jest
      .fn()
      .mockImplementationOnce(() => {
        throw new NotFoundException();
      })
      .mockImplementationOnce((custCode) => Promise.resolve({ custCode })),

    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    update: jest
      .fn()
      .mockImplementation((custCode, dto) =>
        Promise.resolve({ custCode, ...dto }),
      ),
    delete: jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          raw: [],
          affected: 0,
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          raw: [],
          affected: 1,
        }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  it('should find all customers', async () => {
    let result = await customerService.findAll();
    expect(result.length).toBe(0);
    expect(result).toEqual([]);

    result = await customerService.findAll();
    expect(result.length).toBe(1);
    expect(result).toEqual([{ custCode: 'C00001' }]);

    result = await customerService.findAll();
    expect(result.length).toBe(2);
    expect(result).toEqual([{ custCode: 'C00001' }, { custCode: 'C00002' }]);
  });

  it('should find a customer by id', async () => {
    const custCode = 'C00001';
    try {
      await customerService.findOneById(custCode);
    } catch (error) {
      expect(error).toEqual(new NotFoundException());
    }
    //expect(await customerService.findOneById(custCode)).toEqual({ custCode });
  });

  it('should create a new customer', async () => {
    const newCustomer = {} as CreateCustomerDto;
    newCustomer.custCode = 'C00001';
    expect(await customerService.create(newCustomer)).toEqual(newCustomer);
  });

  it('should update a customer', async () => {
    const custCode = 'C00001';
    const updateCustomer = {
      custName: 'custName',
    } as UpdateCustomerDto;
    expect(await customerService.update(custCode, updateCustomer)).toEqual({
      custCode,
      ...updateCustomer,
    });
  });

  it('should delete a customer', async () => {
    const custCode = 'C00001';
    expect(await customerService.delete(custCode)).toEqual({
      raw: [],
      affected: 0,
    });
    expect(await customerService.delete(custCode)).toEqual({
      raw: [],
      affected: 1,
    });
  });
});

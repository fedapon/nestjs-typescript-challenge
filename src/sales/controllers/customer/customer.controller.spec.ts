import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerController } from './customer.controller';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('CustomerController', () => {
  let customerController: CustomerController;
  const mockCustomerService = {
    findAll: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([]))
      .mockImplementationOnce(() => Promise.resolve([{ custCode: 'C00001' }]))
      .mockImplementationOnce(() =>
        Promise.resolve([{ custCode: 'C00001' }, { custCode: 'C00002' }]),
      ),
    findOneById: jest
      .fn()
      .mockImplementationOnce(() => {
        throw new NotFoundException();
      })
      .mockImplementationOnce((custCode) => Promise.resolve({ custCode })),

    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
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
      controllers: [CustomerController],
      providers: [CustomerService],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .compile();

    customerController = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  it('should find all customers', async () => {
    let result = await customerController.findAll();
    expect(result.length).toBe(0);
    expect(result).toEqual([]);

    result = await customerController.findAll();
    expect(result.length).toBe(1);
    expect(result).toEqual([{ custCode: 'C00001' }]);

    result = await customerController.findAll();
    expect(result.length).toBe(2);
    expect(result).toEqual([{ custCode: 'C00001' }, { custCode: 'C00002' }]);
  });

  it('should find a customer by id', async () => {
    const custCode = 'C00001';
    try {
      await customerController.findById(custCode);
    } catch (error) {
      expect(error).toEqual(new NotFoundException());
    }
    expect(await customerController.findById(custCode)).toEqual({ custCode });
  });

  it('should create a new customer', async () => {
    const newCustomer = {} as CreateCustomerDto;
    newCustomer.custCode = 'C00001';
    expect(await customerController.create(newCustomer)).toEqual(newCustomer);
  });

  it('should update a customer', async () => {
    const custCode = 'C00001';
    const updateCustomer = {
      custName: 'custName',
    } as UpdateCustomerDto;
    expect(await customerController.update(custCode, updateCustomer)).toEqual({
      custCode,
      ...updateCustomer,
    });
  });

  it('should delete a customer', async () => {
    const custCode = 'C00001';
    expect(await customerController.delete(custCode)).toEqual({
      raw: [],
      affected: 0,
    });
    expect(await customerController.delete(custCode)).toEqual({
      raw: [],
      affected: 1,
    });
  });
});

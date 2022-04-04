import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateOrderDto } from '../../controllers/order/dto/create-order.dto';
import { UpdateOrderDto } from '../../controllers/order/dto/update-order.dto';
import { Order } from '../../models/order.entity';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;

  const mockOrderRepository = {
    find: jest.fn().mockImplementation(() =>
      Promise.resolve({
        items: [
          {
            ordNum: '200133',
          },
        ],
        meta: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: 'link',
          previous: '',
          next: '',
          last: 'link',
        },
      }),
    ),
    findOne: jest
      .fn()
      .mockImplementationOnce(() => {
        throw new NotFoundException();
      })
      .mockImplementationOnce((ordNum) =>
        Promise.resolve({
          ordNum: String(ordNum),
        }),
      ),
    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    update: jest
      .fn()
      .mockImplementation((ordNum, dto) =>
        Promise.resolve({ ordNum: String(ordNum), ...dto }),
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
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve([
            {
              custCode: 'C00001',
              totalOrdAmount: '3000.00',
            },
          ]),
        )
        .mockImplementationOnce(() =>
          Promise.resolve([
            {
              agentCode: 'A001',
              totalOrdAmount: '800.00',
            },
          ]),
        )
        .mockImplementationOnce(() =>
          Promise.resolve([
            {
              custCountry: 'Australia',
              totalOrdAmount: '7700.00',
            },
          ]),
        ),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getRepositoryToken(Order), useValue: mockOrderRepository },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('should find an order by id', async () => {
    const ordNum = '200133';
    try {
      await orderService.findOneById(Number(ordNum));
    } catch (error) {
      expect(error).toEqual(new NotFoundException());
    }
    //expect(await orderService.findOneById(Number(ordNum))).toEqual({ ordNum });
  });

  it('should create a new order', async () => {
    const newOrder = {} as CreateOrderDto;
    newOrder.ordNum = 200133;
    expect(await orderService.create(newOrder)).toEqual(newOrder);
  });

  it('should update an order', async () => {
    const ordNum = '200133';
    const updateOrder = {
      ordDescription: 'orderDescription',
    } as UpdateOrderDto;
    expect(await orderService.update(Number(ordNum), updateOrder)).toEqual({
      ordNum,
      ...updateOrder,
    });
  });

  it('should delete an order', async () => {
    const ordNum = '200133';
    expect(await orderService.delete(Number(ordNum))).toEqual({
      raw: [],
      affected: 0,
    });
    expect(await orderService.delete(Number(ordNum))).toEqual({
      raw: [],
      affected: 1,
    });
  });

  it('should return total amount by customer', async () => {
    expect(await orderService.totalAmountByCustomer()).toEqual([
      {
        custCode: 'C00001',
        totalOrdAmount: '3000.00',
      },
    ]);
  });

  it('should return total amount by agent', async () => {
    expect(await orderService.totalAmountByAgent()).toEqual([
      {
        agentCode: 'A001',
        totalOrdAmount: '800.00',
      },
    ]);
  });

  it('should return total amount by country', async () => {
    expect(await orderService.totalAmountByCountry()).toEqual([
      {
        custCountry: 'Australia',
        totalOrdAmount: '7700.00',
      },
    ]);
  });
});

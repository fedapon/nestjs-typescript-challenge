import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { SalesModule } from '../../src/sales/sales.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agent } from '../../src/sales/models/agent.entity';
import { Customer } from '../../src/sales/models/customer.entity';
import { Order } from '../../src/sales/models/order.entity';

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue({
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
}));

describe('SalesController (e2e)', () => {
  let app: INestApplication;

  const order = {
    ordNum: '200101',
    ordAmount: '3000',
    advanceAmount: '1000',
    ordDate: '2022-03-27',
    custCode: 'C00001',
    agentCode: 'A001',
    ordDescription: 'SOD',
  };

  const mockOrderRepository = {
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnValue({}),
    }),
    paginate: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(order)),
    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    save: jest.fn().mockImplementation((order) => Promise.resolve(order)),
    update: jest
      .fn()
      .mockImplementation((ordNum, updateOrderDto) =>
        Promise.resolve({ ordNum, ...updateOrderDto }),
      ),
    delete: jest.fn().mockImplementation(() =>
      Promise.resolve({
        raw: [],
        affected: 1,
      }),
    ),
  };

  const mockAgentRepository = {};
  const mockCustomerRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SalesModule],
    })
      .overrideProvider(getRepositoryToken(Agent))
      .useValue(mockAgentRepository)
      .overrideProvider(getRepositoryToken(Customer))
      .useValue(mockCustomerRepository)
      .overrideProvider(getRepositoryToken(Order))
      .useValue(mockOrderRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
      }),
    );
    await app.init();
  });

  it('/orders (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({
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
      });
  });

  it('/orders (POST)', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send(order)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(order);
  });

  it('/orders (POST) should fail because missing parameters', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({})
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/orders (UPDATE)', () => {
    return request(app.getHttpServer())
      .patch('/orders/200101')
      .send({ custName: 'Jhon Smith' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({ ordNum: '200101', custName: 'Jhon Smith' });
  });

  it('/orders (UPDATE) should fail because invalid parameter', () => {
    return request(app.getHttpServer())
      .patch('/orders/200101')
      .send({ ordAmount: 'A' })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/orders (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/orders/200101')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({
        raw: [],
        affected: 1,
      });
  });

  it('should get total amount by customer', () => {
    return request(app.getHttpServer())
      .get('/orders/total-amount-by-customer')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('should get total amount by agent', () => {
    return request(app.getHttpServer())
      .get('/orders/total-amount-by-agent')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('should get total amount by country', () => {
    return request(app.getHttpServer())
      .get('/orders/total-amount-by-country')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import request from 'supertest';
import { AuthModule } from '../../src/auth/auth.module';
import { UsersModule } from '../../src/users/users.module';
import { SalesModule } from '../../src/sales/sales.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agent } from '../../src/sales/models/agent.entity';
import { Customer } from '../../src/sales/models/customer.entity';
import { Order } from '../../src/sales/models/order.entity';
import { User } from '../../src/users/models/user.entity';

jest.mock('bcryptjs', () => {
  return {
    compare: jest.fn().mockImplementation(() => Promise.resolve(true)),
  };
});

describe('SalesController (e2e)', () => {
  let app: INestApplication;

  const customer = {
    custCode: 'C00001',
    custName: 'Charles',
    custCity: 'New York',
    workingArea: 'New York',
    custCountry: 'USA',
    grade: 2,
    openingAmt: '3000',
    receiveAmt: '5000',
    paymentAmt: '2000',
    outstandingAmt: '6000',
    phoneNo: '077-12345674',
    agentCode: 'A001',
  };

  const mockCustomerRepository = {
    find: jest.fn().mockImplementation(() => Promise.resolve([customer])),
    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    save: jest.fn().mockImplementation((customer) => Promise.resolve(customer)),
    update: jest
      .fn()
      .mockImplementation((custCode, updateCustomerDto) =>
        Promise.resolve({ custCode, ...updateCustomerDto }),
      ),
    delete: jest.fn().mockImplementation(() =>
      Promise.resolve({
        raw: [],
        affected: 1,
      }),
    ),
  };

  const mockAgentRepository = {};
  const mockOrderRepository = {};
  const mockUserRepository = {
    findOne: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ ...user, id: 1 })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        SalesModule,
      ],
    })
      .overrideProvider(getRepositoryToken(Agent))
      .useValue(mockAgentRepository)
      .overrideProvider(getRepositoryToken(Customer))
      .useValue(mockCustomerRepository)
      .overrideProvider(getRepositoryToken(Order))
      .useValue(mockOrderRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
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

  async function getValidToken() {
    const {
      body: { access_token },
    } = await request(app.getHttpServer()).post('/api/auth/login').send({
      email: 'demo@demo.com',
      password: 'demo',
    });
    return access_token;
  }

  it('/api/customers (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/customers')
      .auth(await getValidToken(), { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect([customer]);
  });

  it('/api/customers (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/customers')
      .auth(await getValidToken(), { type: 'bearer' })
      .send(customer)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(customer);
  });

  it('/api/customers (POST) should fail because missing parameters', async () => {
    return request(app.getHttpServer())
      .post('/api/customers')
      .auth(await getValidToken(), { type: 'bearer' })
      .send({})
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/customers (UPDATE)', async () => {
    return request(app.getHttpServer())
      .patch('/api/customers/C00001')
      .auth(await getValidToken(), { type: 'bearer' })
      .send({ custName: 'Jhon Smith' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({ custCode: 'C00001', custName: 'Jhon Smith' });
  });

  it('/api/customers (UPDATE) should fail because invalid parameter', async () => {
    return request(app.getHttpServer())
      .patch('/api/customers/C00001')
      .auth(await getValidToken(), { type: 'bearer' })
      .send({ custName: 1 })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/customers (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/api/customers/C00001')
      .auth(await getValidToken(), { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({
        raw: [],
        affected: 1,
      });
  });
});

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

describe('SalesController (e2e)', () => {
  let app: INestApplication;

  const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwiZW1haWwiOiJtYXJpYUBnbWFpbC5jb20iLCJpYXQiOjE2NTI2NTA0NDMsImV4cCI6MTY1MjczNjg0M30.RdvfO1l4O8fnseWyAXZxjfBpG3x30rB-8gu0I5ThUjo';

  const agent = {
    agentCode: 'A001',
    agentName: 'Jhon Smith',
    workingArea: 'London',
    commission: '0.1',
    phoneNo: '077-12345674',
    country: 'USA',
  };

  const mockAgentRepository = {
    find: jest.fn().mockImplementation(() => Promise.resolve([agent])),
    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    save: jest.fn().mockImplementation((agent) => Promise.resolve(agent)),
    update: jest
      .fn()
      .mockImplementation((agentCode, updateAgentDto) =>
        Promise.resolve({ agentCode, ...updateAgentDto }),
      ),
    delete: jest.fn().mockImplementation(() =>
      Promise.resolve({
        raw: [],
        affected: 1,
      }),
    ),
  };

  const mockCustomerRepository = {};
  const mockOrderRepository = {};
  const mockUserRepository = {};

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

  it('/api/agents (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/agents')
      .auth(access_token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect([agent]);
  });

  it('/api/agents (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/agents')
      .auth(access_token, { type: 'bearer' })
      .send(agent)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(agent);
  });

  it('/api/agents (POST) should fail because missing parameters', () => {
    return request(app.getHttpServer())
      .post('/api/agents')
      .auth(access_token, { type: 'bearer' })
      .send({})
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/agents (UPDATE)', () => {
    return request(app.getHttpServer())
      .patch('/api/agents/A001')
      .auth(access_token, { type: 'bearer' })
      .send({ agentName: 'Jhon Smith' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({ agentCode: 'A001', agentName: 'Jhon Smith' });
  });

  it('/api/agents (UPDATE) should fail because invalid parameter', () => {
    return request(app.getHttpServer())
      .patch('/api/agents/A001')
      .auth(access_token, { type: 'bearer' })
      .send({ agentName: 1 })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/agents (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/agents/A001')
      .auth(access_token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({
        raw: [],
        affected: 1,
      });
  });
});

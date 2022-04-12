import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { SalesModule } from '../../src/sales/sales.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agent } from '../../src/sales/models/agent.entity';
import { Customer } from '../../src/sales/models/customer.entity';
import { Order } from '../../src/sales/models/order.entity';

describe('SalesController (e2e)', () => {
  let app: INestApplication;

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

  it('/api/agents (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/agents')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect([agent]);
  });

  it('/api/agents (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/agents')
      .send(agent)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(agent);
  });

  it('/api/agents (POST) should fail because missing parameters', () => {
    return request(app.getHttpServer())
      .post('/api/agents')
      .send({})
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/agents (UPDATE)', () => {
    return request(app.getHttpServer())
      .patch('/api/agents/A001')
      .send({ agentName: 'Jhon Smith' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({ agentCode: 'A001', agentName: 'Jhon Smith' });
  });

  it('/api/agents (UPDATE) should fail because invalid parameter', () => {
    return request(app.getHttpServer())
      .patch('/api/agents/A001')
      .send({ agentName: 1 })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/agents (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/agents/A001')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({
        raw: [],
        affected: 1,
      });
  });
});

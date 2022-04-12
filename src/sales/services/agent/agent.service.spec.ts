import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAgentDto } from '../../controllers/agent/dto/create-agent.dto';
import { UpdateAgentDto } from '../../controllers/agent/dto/update-agent.dto';
import { Agent } from '../../models/agent.entity';
import { AgentService } from './agent.service';

describe('AgentService', () => {
  let agentService: AgentService;

  const mockAgentRepository = {
    find: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([]))
      .mockImplementationOnce(() => Promise.resolve([{ agentCode: 'A001' }]))
      .mockImplementationOnce(() =>
        Promise.resolve([{ agentCode: 'A001' }, { agentCode: 'A002' }]),
      ),
    findOne: jest
      .fn()
      .mockImplementationOnce(() => {
        throw new NotFoundException();
      })
      .mockImplementationOnce((agentCode) => Promise.resolve({ agentCode })),

    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    update: jest
      .fn()
      .mockImplementation((agentCode, dto) =>
        Promise.resolve({ agentCode, ...dto }),
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
        AgentService,
        { provide: getRepositoryToken(Agent), useValue: mockAgentRepository },
      ],
    }).compile();

    agentService = module.get<AgentService>(AgentService);
  });

  it('should be defined', () => {
    expect(agentService).toBeDefined();
  });

  it('should find all agents', async () => {
    let result = await agentService.findAll();
    expect(result.length).toBe(0);
    expect(result).toEqual([]);

    result = await agentService.findAll();
    expect(result.length).toBe(1);
    expect(result).toEqual([{ agentCode: 'A001' }]);

    result = await agentService.findAll();
    expect(result.length).toBe(2);
    expect(result).toEqual([{ agentCode: 'A001' }, { agentCode: 'A002' }]);
  });

  it('should find an agent by id', async () => {
    const agentCode = 'A001';
    try {
      await agentService.findOneById(agentCode);
    } catch (error) {
      expect(error).toEqual(new NotFoundException());
    }
    //expect(await agentService.findOneById(agentCode)).toEqual({ agentCode });
  });

  it('should create a new agent', async () => {
    const newAgent = {} as CreateAgentDto;
    newAgent.agentCode = 'A001';
    expect(await agentService.create(newAgent)).toEqual(newAgent);
  });

  it('should update an agent', async () => {
    const agentCode = 'A001';
    const updateAgent = {
      agentName: 'agentName',
    } as UpdateAgentDto;
    expect(await agentService.update(agentCode, updateAgent)).toEqual({
      agentCode,
      ...updateAgent,
    });
  });

  it('should delete an agent', async () => {
    const agentCode = 'A001';
    expect(await agentService.delete(agentCode)).toEqual({
      raw: [],
      affected: 0,
    });
    expect(await agentService.delete(agentCode)).toEqual({
      raw: [],
      affected: 1,
    });
  });
});

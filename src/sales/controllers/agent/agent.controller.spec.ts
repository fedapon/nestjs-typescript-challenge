import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AgentService } from '../../services/agent/agent.service';
import { AgentController } from './agent.controller';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

describe('AgentController', () => {
  let agentController: AgentController;

  const mockAgentService = {
    findAll: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([]))
      .mockImplementationOnce(() => Promise.resolve([{ agentCode: 'A001' }]))
      .mockImplementationOnce(() =>
        Promise.resolve([{ agentCode: 'A001' }, { agentCode: 'A002' }]),
      ),
    findOneById: jest
      .fn()
      .mockImplementationOnce(() => {
        throw new NotFoundException();
      })
      .mockImplementationOnce((agentCode) => Promise.resolve({ agentCode })),

    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
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
      controllers: [AgentController],
      providers: [AgentService],
    })
      .overrideProvider(AgentService)
      .useValue(mockAgentService)
      .compile();

    agentController = module.get<AgentController>(AgentController);
  });

  it('should be defined', () => {
    expect(agentController).toBeDefined();
  });

  it('should find all agents', async () => {
    let result = await agentController.findAll();
    expect(result.length).toBe(0);
    expect(result).toEqual([]);

    result = await agentController.findAll();
    expect(result.length).toBe(1);
    expect(result).toEqual([{ agentCode: 'A001' }]);

    result = await agentController.findAll();
    expect(result.length).toBe(2);
    expect(result).toEqual([{ agentCode: 'A001' }, { agentCode: 'A002' }]);
  });

  it('should find an agent by id', async () => {
    const agentCode = 'A001';
    try {
      await agentController.findById(agentCode);
    } catch (error) {
      expect(error).toEqual(new NotFoundException());
    }
    expect(await agentController.findById(agentCode)).toEqual({ agentCode });
  });

  it('should create a new agent', async () => {
    const newAgent = {} as CreateAgentDto;
    newAgent.agentCode = 'A001';
    expect(await agentController.create(newAgent)).toEqual(newAgent);
  });

  it('should update an agent', async () => {
    const agentCode = 'A001';
    const updateAgent = {
      agentName: 'agentName',
    } as UpdateAgentDto;
    expect(await agentController.update(agentCode, updateAgent)).toEqual({
      agentCode,
      ...updateAgent,
    });
  });

  it('should delete an agent', async () => {
    const agentCode = 'A001';
    expect(await agentController.delete(agentCode)).toEqual({
      raw: [],
      affected: 0,
    });
    expect(await agentController.delete(agentCode)).toEqual({
      raw: [],
      affected: 1,
    });
  });
});

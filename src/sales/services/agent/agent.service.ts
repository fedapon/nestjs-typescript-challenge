import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAgentDto } from '../../controllers/agent/dto/create-agent.dto';
import { UpdateAgentDto } from '../../controllers/agent/dto/update-agent.dto';
import { Agent } from '../../models/agent.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AgentService {
  constructor(@InjectRepository(Agent) private repository: Repository<Agent>) {}

  async findAll(): Promise<Agent[] | undefined> {
    return this.repository.find();
  }

  async findOneById(agentCode): Promise<Agent | undefined> {
    return this.repository.findOne({
      where: {
        agentCode,
      },
      relations: ['customers'],
    });
  }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent: Agent = await this.repository.create(createAgentDto);
    return await this.repository.save(agent);
  }

  async update(
    agentCode,
    updateAgentDto: UpdateAgentDto,
  ): Promise<UpdateResult> {
    return this.repository.update(agentCode, updateAgentDto);
  }

  async delete(agentCode: string): Promise<DeleteResult> {
    return this.repository.delete(agentCode);
  }
}

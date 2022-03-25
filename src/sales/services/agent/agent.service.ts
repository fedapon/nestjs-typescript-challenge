import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAgentDto } from 'src/sales/controllers/agent/dto/create-agent.dto';
import { UpdateAgentDto } from 'src/sales/controllers/agent/dto/update-agent.dto';
import { Agent } from 'src/sales/models/agent.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AgentService {
  constructor(@InjectRepository(Agent) private agentRepo: Repository<Agent>) {}

  async findAll(): Promise<Agent[] | undefined> {
    return this.agentRepo.find();
  }

  async findOneById(agentCode): Promise<Agent | undefined> {
    return this.agentRepo.findOne(agentCode);
  }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent: Agent = await this.agentRepo.create(createAgentDto);
    return await this.agentRepo.save(agent);
  }

  async update(
    agentCode,
    updateAgentDto: UpdateAgentDto,
  ): Promise<UpdateResult> {
    return this.agentRepo.update(agentCode, updateAgentDto);
  }

  async delete(agentCode: string): Promise<DeleteResult> {
    return this.agentRepo.delete(agentCode);
  }
}

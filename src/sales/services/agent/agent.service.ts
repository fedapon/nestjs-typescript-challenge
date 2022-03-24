import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/sales/models/agent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgentService {
  constructor(@InjectRepository(Agent) private agentRepo: Repository<Agent>) {}

  async findOneById(agentCode): Promise<Agent | undefined> {
    return this.agentRepo.findOne(agentCode);
  }
}

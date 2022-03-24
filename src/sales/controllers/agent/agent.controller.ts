import { Controller, Get } from '@nestjs/common';
import { AgentService } from 'src/sales/services/agent/agent.service';

@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Get('/')
  async get() {
    return this.agentService.findOneById('A001');
  }
}

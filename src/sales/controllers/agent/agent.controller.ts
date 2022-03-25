import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AgentService } from 'src/sales/services/agent/agent.service';
import { Agent } from 'src/sales/models/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('agents')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Get()
  async findAll() {
    return this.agentService.findAll();
  }

  @Get(':agentCode')
  async findById(@Param('agentCode') agentCode: string) {
    const data = await this.agentService.findOneById(agentCode);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  async create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentService.create(createAgentDto);
  }

  @Patch(':agentCode')
  async update(
    @Param('agentCode') agentCode: string,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<UpdateResult> {
    return this.agentService.update(agentCode, updateAgentDto);
  }

  @Delete(':agentCode')
  async delete(@Param('agentCode') agentCode: string): Promise<DeleteResult> {
    return this.agentService.delete(agentCode);
  }
}

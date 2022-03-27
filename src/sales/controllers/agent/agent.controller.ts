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
import { AgentService } from '../../services/agent/agent.service';
import { Agent } from '../../models/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Agents')
@ApiExtraModels(Agent)
@Controller('agents')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all agents' })
  async findAll() {
    return this.agentService.findAll();
  }

  @Get(':agentCode')
  @ApiOperation({ summary: 'Get agent by agentCode with its customers' })
  async findById(@Param('agentCode') agentCode: string) {
    const data = await this.agentService.findOneById(agentCode);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  async create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentService.create(createAgentDto);
  }

  @Patch(':agentCode')
  @ApiOperation({ summary: 'Update an existing agents' })
  async update(
    @Param('agentCode') agentCode: string,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<UpdateResult> {
    return this.agentService.update(agentCode, updateAgentDto);
  }

  @Delete(':agentCode')
  @ApiOperation({ summary: 'Delete an existing agents by its agentCode' })
  async delete(@Param('agentCode') agentCode: string): Promise<DeleteResult> {
    return this.agentService.delete(agentCode);
  }
}

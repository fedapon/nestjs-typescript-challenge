import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AgentService } from '../../services/agent/agent.service';
import { Agent } from '../../models/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../../../auth/guards/jwt-auth.guard';

@ApiTags('Agents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/agents')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all agents' })
  @ApiResponse({
    status: 200,
    description: 'Get an array with all agents',
    schema: {
      example: [
        {
          agentCode: 'A001',
          agentName: 'Jhon Smith',
          workingArea: 'London',
          commission: '0.10',
          phoneNo: '077-12345674',
          country: 'USA',
        },
        {
          agentCode: 'A002',
          agentName: 'Mukesh',
          workingArea: 'Mumbai',
          commission: '0.11',
          phoneNo: '029-12358964',
          country: '',
        },
      ],
    },
  })
  async findAll() {
    return this.agentService.findAll();
  }

  @Get(':agentCode')
  @ApiOperation({ summary: 'Get agent by agentCode with its customers' })
  @ApiResponse({
    status: 200,
    description: 'Agent data get by agentCode',
    schema: {
      example: {
        agentCode: 'A001',
        agentName: 'Jhon Smith',
        workingArea: 'London',
        commission: '0.10',
        phoneNo: '077-12345674',
        country: 'USA',
        customers: [
          {
            custCode: 'C00001',
            custName: 'Charles',
            custCity: 'New York',
            workingArea: 'New York',
            custCountry: 'USA',
            grade: 2,
            openingAmt: '3000.00',
            receiveAmt: '5000.00',
            paymentAmt: '2000.00',
            outstandingAmt: '6000.00',
            phoneNo: '077-12345674',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Agent not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Not Found',
      },
    },
  })
  async findById(@Param('agentCode') agentCode: string) {
    const data = await this.agentService.findOneById(agentCode);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  @ApiBody({ type: CreateAgentDto })
  @ApiResponse({
    status: 201,
    description: 'Agent successfully created',
    schema: {
      example: {
        agentCode: 'A001',
        agentName: 'Jhon Smith',
        workingArea: 'London',
        commission: '0.10',
        phoneNo: '077-12345674',
        country: 'USA',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Agent failed to be created due to wrong parameters format',
    schema: {
      example: {
        statusCode: 400,
        message: ['commission is not a valid decimal number.'],
        error: 'Bad Request',
      },
    },
  })
  async create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentService.create(createAgentDto);
  }

  @Patch(':agentCode')
  @ApiOperation({ summary: 'Update an existing agents' })
  @ApiBody({ type: UpdateAgentDto })
  @ApiResponse({
    status: 200,
    description: 'Agent successfully updated',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  async update(
    @Param('agentCode') agentCode: string,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<UpdateResult> {
    return this.agentService.update(agentCode, updateAgentDto);
  }

  @Delete(':agentCode')
  @ApiOperation({ summary: 'Delete an existing agents by its agentCode' })
  @ApiResponse({
    status: 200,
    description: 'Agent successfully deleted',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Agent was not deleted because forein key constraint',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async delete(@Param('agentCode') agentCode: string): Promise<DeleteResult> {
    return this.agentService.delete(agentCode);
  }
}

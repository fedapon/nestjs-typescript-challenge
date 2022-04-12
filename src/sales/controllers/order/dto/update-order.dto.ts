import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Agent } from '../../../models/agent.entity';
import { Customer } from '../../../models/customer.entity';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    example: '3000',
    type: String,
  })
  @IsOptional()
  @IsNumberString()
  ordAmount: number;

  @ApiPropertyOptional({
    example: '1000',
    type: String,
  })
  @IsOptional()
  @IsNumberString()
  advanceAmount: number;

  @ApiPropertyOptional({
    example: '2022-03-27',
  })
  @IsOptional()
  @IsDateString()
  ordDate: Date;

  @ApiPropertyOptional({
    example: 'C00001',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(6)
  custCode: Customer;

  @ApiPropertyOptional({
    example: 'A001',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;

  @ApiPropertyOptional({
    example: 'SOD',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(60)
  ordDescription: string;
}

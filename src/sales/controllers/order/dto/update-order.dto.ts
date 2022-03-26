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
  @IsOptional()
  @IsNumberString()
  ordAmount: number;

  @IsOptional()
  @IsNumberString()
  advanceAmount: number;

  @IsOptional()
  @IsDateString()
  ordDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(6)
  custCode: Customer;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(60)
  ordDescription: string;
}

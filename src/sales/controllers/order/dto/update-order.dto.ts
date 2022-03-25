import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Agent } from 'src/sales/models/agent.entity';
import { Customer } from 'src/sales/models/customer.entity';

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

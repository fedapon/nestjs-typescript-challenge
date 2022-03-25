import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
} from 'class-validator';
import { Agent } from 'src/sales/models/agent.entity';
import { Customer } from 'src/sales/models/customer.entity';

export class CreateOrderDto {
  @IsNumberString()
  ordNum: number;

  @IsNumberString()
  ordAmount: number;

  @IsNumberString()
  advanceAmount: number;

  @IsDateString()
  ordDate: Date;

  @IsNotEmpty()
  @MaxLength(6)
  custCode: Customer;

  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;

  @IsNotEmpty()
  @MaxLength(60)
  ordDescription: string;
}

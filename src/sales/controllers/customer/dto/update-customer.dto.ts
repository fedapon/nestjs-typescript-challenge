import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Agent } from 'src/sales/models/agent.entity';

export class UpdateCustomerDto {
  @IsNotEmpty()
  @MaxLength(40)
  custName: string;

  @IsOptional()
  @MaxLength(35)
  custCity: string;

  @IsNotEmpty()
  @MaxLength(35)
  workingArea: string;

  @IsNotEmpty()
  @MaxLength(20)
  custCountry: string;

  @IsOptional()
  @IsInt()
  grade: number;

  @IsNotEmpty()
  @IsDecimal()
  openingAmt: number;

  @IsNotEmpty()
  @IsDecimal()
  receiveAmt: number;

  @IsNotEmpty()
  @IsDecimal()
  paymentAmt: number;

  @IsNotEmpty()
  @IsDecimal()
  outstandingAmt: number;

  @IsNotEmpty()
  @MaxLength(15)
  phoneNo: string;

  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;
}

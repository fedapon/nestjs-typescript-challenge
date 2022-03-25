import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Agent } from 'src/sales/models/agent.entity';

export class UpdateCustomerDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(40)
  custName: string;

  @IsOptional()
  @MaxLength(35)
  custCity: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(35)
  workingArea: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(20)
  custCountry: string;

  @IsOptional()
  @IsInt()
  grade: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  openingAmt: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  receiveAmt: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  paymentAmt: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  outstandingAmt: number;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(15)
  phoneNo: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;
}

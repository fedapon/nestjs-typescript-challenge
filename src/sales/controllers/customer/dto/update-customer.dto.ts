import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Agent } from '../../../models/agent.entity';

export class UpdateCustomerDto {
  @ApiPropertyOptional({
    example: 'Charles',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(40)
  custName: string;

  @ApiPropertyOptional({
    example: 'New York',
  })
  @IsOptional()
  @MaxLength(35)
  custCity: string;

  @ApiPropertyOptional({
    example: 'New York',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(35)
  workingArea: string;

  @ApiPropertyOptional({
    example: 'USA',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(20)
  custCountry: string;

  @ApiPropertyOptional({
    example: '2',
  })
  @IsOptional()
  @IsInt()
  grade: number;

  @ApiPropertyOptional({
    example: '3000',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  openingAmt: number;

  @ApiPropertyOptional({
    example: '500',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  receiveAmt: number;

  @ApiPropertyOptional({
    example: '2000',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  paymentAmt: number;

  @ApiPropertyOptional({
    example: '6000',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  outstandingAmt: number;

  @ApiPropertyOptional({
    example: '077-12345674',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(15)
  phoneNo: string;

  @ApiPropertyOptional({
    example: 'A001',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Agent } from '../../../models/agent.entity';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'C00001',
  })
  @IsNotEmpty()
  @MaxLength(6)
  custCode: string;

  @ApiProperty({
    example: 'Charles',
  })
  @IsNotEmpty()
  @MaxLength(40)
  custName: string;

  @ApiPropertyOptional({
    example: 'New York',
  })
  @IsOptional()
  @MaxLength(35)
  custCity: string;

  @ApiProperty({
    example: 'New York',
  })
  @IsNotEmpty()
  @MaxLength(35)
  workingArea: string;

  @ApiProperty({
    example: 'USA',
  })
  @IsNotEmpty()
  @MaxLength(20)
  custCountry: string;

  @ApiPropertyOptional({
    example: '2',
  })
  @IsOptional()
  @IsInt()
  grade: number;

  @ApiProperty({
    example: '3000',
    type: String,
  })
  @IsNotEmpty()
  @IsDecimal()
  openingAmt: number;

  @ApiProperty({
    example: '500',
    type: String,
  })
  @IsNotEmpty()
  @IsDecimal()
  receiveAmt: number;

  @ApiProperty({
    example: '2000',
    type: String,
  })
  @IsNotEmpty()
  @IsDecimal()
  paymentAmt: number;

  @ApiProperty({
    example: '6000',
    type: String,
  })
  @IsNotEmpty()
  @IsDecimal()
  outstandingAmt: number;

  @ApiProperty({
    example: '077-12345674',
  })
  @IsNotEmpty()
  @MaxLength(15)
  phoneNo: string;

  @ApiProperty({
    example: 'A001',
  })
  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;
}

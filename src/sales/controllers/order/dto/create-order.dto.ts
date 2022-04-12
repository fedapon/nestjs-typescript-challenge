import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
} from 'class-validator';
import { Agent } from '../../../models/agent.entity';
import { Customer } from '../../../models/customer.entity';

export class CreateOrderDto {
  @ApiProperty({
    example: '200101',
    type: String,
  })
  @IsNumberString()
  ordNum: number;

  @ApiProperty({
    example: '3000',
    type: String,
  })
  @IsNumberString()
  ordAmount: number;

  @ApiProperty({
    example: '1000',
    type: String,
  })
  @IsNumberString()
  advanceAmount: number;

  @ApiProperty({
    example: '2022-03-27',
  })
  @IsDateString()
  ordDate: Date;

  @ApiProperty({
    example: 'C00001',
  })
  @IsNotEmpty()
  @MaxLength(6)
  custCode: Customer;

  @ApiProperty({
    example: 'A001',
  })
  @IsNotEmpty()
  @MaxLength(6)
  agentCode: Agent;

  @ApiProperty({
    example: 'SOD',
  })
  @IsNotEmpty()
  @MaxLength(60)
  ordDescription: string;
}

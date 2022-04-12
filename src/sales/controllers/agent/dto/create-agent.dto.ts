import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty({
    example: 'A001',
  })
  @IsNotEmpty()
  @MaxLength(6)
  agentCode: string;

  @ApiPropertyOptional({
    example: 'Jhon Smith',
  })
  @IsOptional()
  @MaxLength(40)
  agentName: string;

  @ApiPropertyOptional({
    example: 'London',
  })
  @IsOptional()
  @MaxLength(35)
  workingArea: string;

  @ApiPropertyOptional({
    example: '0.10',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  commission: number;

  @ApiPropertyOptional({
    example: '077-12345674',
  })
  @IsOptional()
  @MaxLength(15)
  phoneNo: string;

  @ApiPropertyOptional({
    example: 'USA',
  })
  @IsOptional()
  @MaxLength(25)
  country: string;
}

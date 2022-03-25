import { IsDecimal, IsOptional, MaxLength } from 'class-validator';

export class UpdateAgentDto {
  @IsOptional()
  @MaxLength(40)
  agentName: string;

  @IsOptional()
  @MaxLength(35)
  workingArea: string;

  @IsOptional()
  @IsDecimal()
  commission: number;

  @IsOptional()
  @MaxLength(15)
  phoneNo: string;

  @IsOptional()
  @MaxLength(25)
  country: string;
}

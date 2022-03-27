import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'agents' })
export class Agent {
  @ApiProperty({
    example: 'A001',
  })
  @PrimaryColumn({
    name: 'agent_code',
    type: 'char',
    length: 6,
    nullable: false,
  })
  agentCode: string;

  @ApiPropertyOptional({
    example: 'Jhon Smith',
  })
  @Column({
    name: 'agent_name',
    type: 'char',
    length: 40,
    nullable: true,
    default: null,
  })
  agentName: string;

  @ApiPropertyOptional({
    example: 'London',
  })
  @Column({
    name: 'working_area',
    type: 'char',
    length: 35,
    nullable: true,
    default: null,
  })
  workingArea: string;

  @ApiPropertyOptional({
    example: '0.10',
  })
  @Column({
    name: 'commission',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: null,
  })
  commission: number;

  @ApiPropertyOptional({
    example: '077-12345674',
  })
  @Column({
    name: 'phone_no',
    type: 'char',
    length: 15,
    nullable: true,
    default: null,
  })
  phoneNo: string;

  @ApiPropertyOptional({
    example: 'USA',
  })
  @Column({
    name: 'country',
    type: 'varchar',
    length: 25,
    nullable: true,
    default: null,
  })
  country: string;

  @ApiPropertyOptional({
    type: () => Customer,
    isArray: true,
  })
  @OneToMany(() => Customer, (customer) => customer.agentCode)
  customers: Customer[];
}

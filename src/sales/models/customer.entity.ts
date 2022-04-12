import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Agent } from './agent.entity';

@Entity({ name: 'customers' })
export class Customer {
  @ApiProperty({
    example: 'C00001',
  })
  @PrimaryColumn({
    name: 'cust_code',
    type: 'char',
    length: 6,
    nullable: false,
  })
  custCode: string;

  @ApiProperty({
    example: 'Charles',
  })
  @Column({
    name: 'cust_name',
    type: 'char',
    length: 40,
    nullable: false,
  })
  custName: string;

  @ApiPropertyOptional({
    example: 'New York',
  })
  @Column({
    name: 'cust_city',
    type: 'varchar',
    length: 35,
    nullable: true,
    default: null,
  })
  custCity: string;

  @ApiProperty({
    example: 'New York',
  })
  @Column({
    name: 'working_area',
    type: 'varchar',
    length: 35,
    nullable: false,
  })
  workingArea: string;

  @ApiProperty({
    example: 'USA',
  })
  @Column({
    name: 'cust_country',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  custCountry: string;

  @ApiPropertyOptional({
    example: '2',
  })
  @Column({
    name: 'grade',
    type: 'integer',
    precision: 11,
    nullable: true,
    default: null,
  })
  grade: number;

  @ApiProperty({
    example: '3000',
  })
  @Column({
    name: 'opening_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  openingAmt: number;

  @ApiProperty({
    example: '500',
  })
  @Column({
    name: 'receive_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  receiveAmt: number;

  @ApiProperty({
    example: '2000',
  })
  @Column({
    name: 'payment_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  paymentAmt: number;

  @ApiProperty({
    example: '6000',
  })
  @Column({
    name: 'outstanding_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  outstandingAmt: number;

  @ApiProperty({
    example: '077-12345674',
  })
  @Column({
    name: 'phone_no',
    type: 'varchar',
    length: 17,
    nullable: false,
  })
  phoneNo: string;

  @ApiProperty({
    type: () => Agent,
  })
  @ManyToOne(() => Agent, (agent) => agent.customers)
  @JoinColumn({ name: 'agent_code' })
  agentCode: Agent;
}

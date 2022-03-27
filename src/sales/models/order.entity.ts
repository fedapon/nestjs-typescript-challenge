import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Agent } from './agent.entity';
import { Customer } from './customer.entity';

@Entity({ name: 'orders' })
export class Order {
  @ApiProperty({
    example: '200101',
  })
  @PrimaryColumn({
    name: 'ord_num',
    type: 'decimal',
    precision: 6,
    scale: 0,
    nullable: false,
  })
  ordNum: number;

  @ApiProperty({
    example: '3000',
  })
  @Column({
    name: 'ord_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  ordAmount: number;

  @ApiProperty({
    example: '1000',
  })
  @Column({
    name: 'advance_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  advanceAmount: number;

  @ApiProperty({
    example: '2022-03-27',
  })
  @Column({
    name: 'ord_date',
    type: 'date',
    nullable: false,
  })
  ordDate: Date;

  @ApiProperty({
    type: () => Customer,
  })
  @ManyToOne(() => Customer, (custCode) => custCode.custCode)
  @JoinColumn({ name: 'cust_code' })
  custCode: Customer;

  @ApiProperty({
    type: () => Agent,
  })
  @ManyToOne(() => Agent, (agentCode) => agentCode.agentCode)
  @JoinColumn({ name: 'agent_code' })
  agentCode: Agent;

  @ApiProperty({
    example: 'SOD',
  })
  @Column({
    name: 'ord_description',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  ordDescription: string;
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Agent } from 'src/sales/models/agent.entity';
import { Customer } from 'src/sales/models/customer.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryColumn({
    name: 'ord_num',
    type: 'decimal',
    precision: 6,
    scale: 0,
    nullable: false,
  })
  ordNum: number;

  @Column({
    name: 'ord_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  ordAmount: number;

  @Column({
    name: 'advance_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  advanceAmount: number;

  @Column({
    name: 'ord_date',
    type: 'date',
    nullable: false,
  })
  ordDate: Date;

  @ManyToOne(() => Customer, (custCode) => custCode.custCode, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cust_code' })
  custCode: Customer;

  @ManyToOne(() => Agent, (agentCode) => agentCode.agentCode, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'agent_code' })
  agentCode: Agent;

  @Column({
    name: 'ord_description',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  ordDescription: string;
}

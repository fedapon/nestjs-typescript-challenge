import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Agent } from 'src/sales/models/agent.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryColumn({
    name: 'cust_code',
    type: 'char',
    length: 6,
    nullable: false,
  })
  custCode: string;

  @Column({
    name: 'cust_name',
    type: 'char',
    length: 40,
    nullable: false,
  })
  custName: string;

  @Column({
    name: 'cust_city',
    type: 'varchar',
    length: 35,
    nullable: true,
    default: null,
  })
  custCity: string;

  @Column({
    name: 'working_area',
    type: 'varchar',
    length: 35,
    nullable: false,
  })
  workingArea: string;

  @Column({
    name: 'cust_country',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  custCountry: string;

  @Column({
    name: 'grade',
    type: 'integer',
    precision: 11,
    nullable: true,
    default: null,
  })
  grade: number;

  @Column({
    name: 'opening_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  openingAmt: number;

  @Column({
    name: 'receive_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  receiveAmt: number;

  @Column({
    name: 'payment_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  paymentAmt: number;

  @Column({
    name: 'outstanding_amt',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  outstandingAmt: number;

  @Column({
    name: 'phone_no',
    type: 'varchar',
    length: 17,
    nullable: false,
  })
  phoneNo: string;

  @ManyToOne(() => Agent, (agent) => agent.agentCode)
  @JoinColumn({ name: 'agent_code' })
  agentCode: Agent;
}

import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Customer } from 'src/sales/models/customer.entity';

@Entity({ name: 'agents' })
export class Agent {
  @PrimaryColumn({
    name: 'agent_code',
    type: 'char',
    length: 6,
    nullable: false,
  })
  agentCode: string;

  @Column({
    name: 'agent_name',
    type: 'char',
    length: 40,
    nullable: true,
    default: null,
  })
  agentName: string;

  @Column({
    name: 'working_area',
    type: 'char',
    length: 35,
    nullable: true,
    default: null,
  })
  workingArea: string;

  @Column({
    name: 'commission',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: null,
  })
  commission: number;

  @Column({
    name: 'phone_no',
    type: 'char',
    length: 15,
    nullable: true,
    default: null,
  })
  phoneNo: string;

  @Column({
    name: 'country',
    type: 'varchar',
    length: 25,
    nullable: true,
    default: null,
  })
  country: string;

  @OneToMany(() => Customer, (customer) => customer.custCode)
  customers: Customer[];
}

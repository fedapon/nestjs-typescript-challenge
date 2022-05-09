import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'first_name',
    type: 'char',
    length: 40,
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'char',
    length: 40,
    nullable: true,
  })
  lastName: string;

  @Column({
    name: 'email',
    type: 'char',
    length: 40,
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'char',
    length: 80,
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: null,
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;
}

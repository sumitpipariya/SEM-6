import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  STUDENT = 'STUDENT',
}

@Entity('User')
export class User {

  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ unique: true })
  Username: string;

  @Column()
  Password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  Role: UserRole;
}

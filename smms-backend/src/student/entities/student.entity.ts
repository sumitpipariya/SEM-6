import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('Student')
export class Student {
    @PrimaryGeneratedColumn()
    StudentID: number;

    @Column({ unique: true })
    EnrollmentNo: string;

    @Column()
    StudentName: string;

    @Column({ nullable: true })
    MobileNo: string;

    @Column({ nullable: true })
    EmailAddress: string;

    @Column({ type: 'text', nullable: true })
    Description: string;

    // 🔹 Relation with User
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'UserID' })
    User: User;



    @CreateDateColumn()
    Created: Date;

    @UpdateDateColumn()
    Modified: Date;
}

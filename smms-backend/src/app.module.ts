import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { StudentModule } from './student/student.module';
import { StaffModule } from './staff/staff.module';
import { StudentMentorModule } from './student-mentor/student-mentor.module';
import { StudentMentoringModule } from './student-mentoring/student-mentoring.module';

import { User } from './users/entities/user.entity';
import { Student } from './student/entities/student.entity';
import { Staff } from './staff/entities/staff.entity';
import { StudentMentor } from './student-mentor/entities/student-mentor.entity';
import { StudentMentoring } from './student-mentoring/entities/student-mentoring.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Smit@1105',
      database: 'SMMS_DATABASE',
      entities: [User, Student, Staff, StudentMentor, StudentMentoring], 
      synchronize: false,
    }),

    UsersModule,
    StudentModule,
    StaffModule,
    StudentMentorModule,
    StudentMentoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

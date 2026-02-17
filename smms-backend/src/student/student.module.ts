// import { Module } from '@nestjs/common';
// import { StudentService } from './student.service';
// import { StudentController } from './student.controller';

// @Module({
//   controllers: [StudentController],
//   providers: [StudentService],
// })
// export class StudentModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

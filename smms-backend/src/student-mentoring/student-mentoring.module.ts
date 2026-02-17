import { Module } from '@nestjs/common';
import { StudentMentoringService } from './student-mentoring.service';
import { StudentMentoringController } from './student-mentoring.controller';

@Module({
  controllers: [StudentMentoringController],
  providers: [StudentMentoringService],
})
export class StudentMentoringModule {}

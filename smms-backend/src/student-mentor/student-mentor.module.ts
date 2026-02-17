import { Module } from '@nestjs/common';
import { StudentMentorService } from './student-mentor.service';
import { StudentMentorController } from './student-mentor.controller';

@Module({
  controllers: [StudentMentorController],
  providers: [StudentMentorService],
})
export class StudentMentorModule {}

import { Injectable } from '@nestjs/common';
import { CreateStudentMentoringDto } from './dto/create-student-mentoring.dto';
import { UpdateStudentMentoringDto } from './dto/update-student-mentoring.dto';

@Injectable()
export class StudentMentoringService {
  create(createStudentMentoringDto: CreateStudentMentoringDto) {
    return 'This action adds a new studentMentoring';
  }

  findAll() {
    return `This action returns all studentMentoring`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentMentoring`;
  }

  update(id: number, updateStudentMentoringDto: UpdateStudentMentoringDto) {
    return `This action updates a #${id} studentMentoring`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentMentoring`;
  }
}

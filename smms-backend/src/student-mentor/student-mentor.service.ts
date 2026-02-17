import { Injectable } from '@nestjs/common';
import { CreateStudentMentorDto } from './dto/create-student-mentor.dto';
import { UpdateStudentMentorDto } from './dto/update-student-mentor.dto';

@Injectable()
export class StudentMentorService {
  create(createStudentMentorDto: CreateStudentMentorDto) {
    return 'This action adds a new studentMentor';
  }

  findAll() {
    return `This action returns all studentMentor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentMentor`;
  }

  update(id: number, updateStudentMentorDto: UpdateStudentMentorDto) {
    return `This action updates a #${id} studentMentor`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentMentor`;
  }
}

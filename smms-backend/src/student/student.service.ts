import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    const user = await this.userRepo.findOne({
      where: { UserID: createStudentDto.UserID },
    });

    const student = this.studentRepo.create({
      ...createStudentDto,
      User: { UserID: createStudentDto.UserID } as any,
    });

    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find({
      relations: ['User'],
    });
  }

  findOne(id: number) {
    return this.studentRepo.findOne({
      where: { StudentID: id },
      relations: ['User'],
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepo.delete(id);
  }
}

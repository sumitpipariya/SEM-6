import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentMentorDto } from './create-student-mentor.dto';

export class UpdateStudentMentorDto extends PartialType(CreateStudentMentorDto) {}

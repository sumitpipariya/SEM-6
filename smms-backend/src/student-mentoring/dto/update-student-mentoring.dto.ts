import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentMentoringDto } from './create-student-mentoring.dto';

export class UpdateStudentMentoringDto extends PartialType(CreateStudentMentoringDto) {}

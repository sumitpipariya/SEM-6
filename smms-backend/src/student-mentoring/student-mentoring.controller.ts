import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentMentoringService } from './student-mentoring.service';
import { CreateStudentMentoringDto } from './dto/create-student-mentoring.dto';
import { UpdateStudentMentoringDto } from './dto/update-student-mentoring.dto';

@Controller('student-mentoring')
export class StudentMentoringController {
  constructor(private readonly studentMentoringService: StudentMentoringService) {}

  @Post()
  create(@Body() createStudentMentoringDto: CreateStudentMentoringDto) {
    return this.studentMentoringService.create(createStudentMentoringDto);
  }

  @Get()
  findAll() {
    return this.studentMentoringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentMentoringService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentMentoringDto: UpdateStudentMentoringDto) {
    return this.studentMentoringService.update(+id, updateStudentMentoringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentMentoringService.remove(+id);
  }
}

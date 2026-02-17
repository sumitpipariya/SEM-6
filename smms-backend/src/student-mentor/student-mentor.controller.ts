import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentMentorService } from './student-mentor.service';
import { CreateStudentMentorDto } from './dto/create-student-mentor.dto';
import { UpdateStudentMentorDto } from './dto/update-student-mentor.dto';

@Controller('student-mentor')
export class StudentMentorController {
  constructor(private readonly studentMentorService: StudentMentorService) {}

  @Post()
  create(@Body() createStudentMentorDto: CreateStudentMentorDto) {
    return this.studentMentorService.create(createStudentMentorDto);
  }

  @Get()
  findAll() {
    return this.studentMentorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentMentorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentMentorDto: UpdateStudentMentorDto) {
    return this.studentMentorService.update(+id, updateStudentMentorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentMentorService.remove(+id);
  }
}

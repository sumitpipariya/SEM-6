import { Test, TestingModule } from '@nestjs/testing';
import { StudentMentorController } from './student-mentor.controller';
import { StudentMentorService } from './student-mentor.service';

describe('StudentMentorController', () => {
  let controller: StudentMentorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentMentorController],
      providers: [StudentMentorService],
    }).compile();

    controller = module.get<StudentMentorController>(StudentMentorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StudentMentoringController } from './student-mentoring.controller';
import { StudentMentoringService } from './student-mentoring.service';

describe('StudentMentoringController', () => {
  let controller: StudentMentoringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentMentoringController],
      providers: [StudentMentoringService],
    }).compile();

    controller = module.get<StudentMentoringController>(StudentMentoringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

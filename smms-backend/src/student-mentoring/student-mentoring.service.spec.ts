import { Test, TestingModule } from '@nestjs/testing';
import { StudentMentoringService } from './student-mentoring.service';

describe('StudentMentoringService', () => {
  let service: StudentMentoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMentoringService],
    }).compile();

    service = module.get<StudentMentoringService>(StudentMentoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

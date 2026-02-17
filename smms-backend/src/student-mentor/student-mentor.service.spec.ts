import { Test, TestingModule } from '@nestjs/testing';
import { StudentMentorService } from './student-mentor.service';

describe('StudentMentorService', () => {
  let service: StudentMentorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMentorService],
    }).compile();

    service = module.get<StudentMentorService>(StudentMentorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

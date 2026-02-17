import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  Username: string;
  Password: string;
  Role: UserRole;
}

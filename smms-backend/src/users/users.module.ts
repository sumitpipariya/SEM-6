// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { User } from './entities/user.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])], // 🔥 VERY IMPORTANT
//   controllers: [UsersController],
//   providers: [UsersService],
//   exports: [TypeOrmModule], // 🔥 ADD THIS
// })
// export class UsersModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}

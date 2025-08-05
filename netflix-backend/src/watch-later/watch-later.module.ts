import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchLaterService } from './watch-later.service';
import { WatchLaterController } from './watch-later.controller';
import { User } from '../users/user.entity';
import { WatchLater } from './entities/watch-later.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchLater, User])],
  providers: [WatchLaterService],
  controllers: [WatchLaterController],
})
export class WatchLaterModule {}

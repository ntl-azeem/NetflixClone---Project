import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { WatchLater } from './entities/watch-later.entity';

@Injectable()
export class WatchLaterService {
  constructor(
    @InjectRepository(WatchLater) private repo: Repository<WatchLater>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getAll(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async add(userId: string, dto: { movieId: string; title: string; poster: string }) {
    const user = await this.userRepo.findOneBy({ id: userId });

    const existing = await this.repo.findOne({
      where: { user: { id: userId }, movieId: dto.movieId },
    });
    if (existing) return existing;

    const entry = this.repo.create({ ...dto, user });
    return this.repo.save(entry);
  }

  async remove(userId: string, movieId: string) {
    const found = await this.repo.findOne({
      where: { user: { id: userId }, movieId },
    });

    if (!found) throw new NotFoundException('Entry not found');
    await this.repo.remove(found);
    return { success: true };
  }
}

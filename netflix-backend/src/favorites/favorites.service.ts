import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private favRepo: Repository<Favorite>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getAll(userId: string) {
    return this.favRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async addFavorite(userId: string, dto: { movieId: string; title: string; poster: string }) {
    const user = await this.userRepo.findOneBy({ id: userId });

    const existing = await this.favRepo.findOne({
      where: { user: { id: userId }, movieId: dto.movieId },
    });
    if (existing) return existing;

    const fav = this.favRepo.create({ ...dto, user });
    return this.favRepo.save(fav);
  }

  async removeFavorite(userId: string, movieId: string) {
    const fav = await this.favRepo.findOne({
      where: { user: { id: userId }, movieId },
    });

    if (!fav) throw new NotFoundException('Favorite not found');
    await this.favRepo.remove(fav);
    return { success: true };
  }
}

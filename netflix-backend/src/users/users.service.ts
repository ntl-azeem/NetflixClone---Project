import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    return this.userRepo.findOneBy({ id: userId });
  }

  async updateProfile(userId: string, data: Partial<User>) {
    await this.userRepo.update(userId, data);
    return this.getProfile(userId);
  }

  async getDashboardData(userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    return {
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        avatar: user.avatar || '',
        memberSince: user.createdAt,
        welcomeMessage: `Welcome back, ${user.name}!`,
    };
    }

}
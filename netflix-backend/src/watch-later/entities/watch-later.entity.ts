// src/watch-later/watch-later.entity.ts
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class WatchLater {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.watchLater, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  movieId: string;

  @Column()
  title: string;

  @Column()
  poster: string;

  @CreateDateColumn()
  createdAt: Date;
}

import { Favorite } from 'src/favorites/entities/favorite.entity';
import { WatchLater } from 'src/watch-later/entities/watch-later.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  // user.entity.ts
  @Column({ nullable: true })
  resetToken?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  
  @OneToMany(() => Favorite, (fav) => fav.user)
  favorites: Favorite[];

  @OneToMany(() => WatchLater, (watchLater) => watchLater.user)
  watchLater: WatchLater[];
}

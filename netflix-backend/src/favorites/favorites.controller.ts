import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(@Req() req) {
    return this.favoritesService.getAll(req.user.sub);
  }

  @Post()
  addFavorite(@Req() req, @Body() dto: { movieId: string; title: string; poster: string }) {
    return this.favoritesService.addFavorite(req.user.sub, dto);
  }

  @Delete(':movieId')
  removeFavorite(@Req() req, @Param('movieId') movieId: string) {
    return this.favoritesService.removeFavorite(req.user.sub, movieId);
  }
}
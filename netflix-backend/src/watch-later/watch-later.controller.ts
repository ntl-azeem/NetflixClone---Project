import { Controller, Get, Post, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { WatchLaterService } from './watch-later.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('watch-later')
export class WatchLaterController {
  constructor(private readonly service: WatchLaterService) {}

  @Get()
  getAll(@Req() req) {
    return this.service.getAll(req.user.sub);
  }

  @Post()
  add(@Req() req, @Body() dto: { movieId: string; title: string; poster: string }) {
    return this.service.add(req.user.sub, dto);
  }

  @Delete(':movieId')
  remove(@Req() req, @Param('movieId') movieId: string) {
    return this.service.remove(req.user.sub, movieId);
  }
}

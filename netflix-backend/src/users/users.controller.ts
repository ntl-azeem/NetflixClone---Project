// src/users/user.controller.ts

import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
 


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.sub);
  }

  @Patch('me')
  updateProfile(@Req() req, @Body() data: any) {
    return this.userService.updateProfile(req.user.sub, data);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
    getDashboard(@Req() req) {
    return this.userService.getDashboardData(req.user.sub);
  }
}

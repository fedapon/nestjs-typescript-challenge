import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './../guards/local-auth.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return req.user;
  }
}

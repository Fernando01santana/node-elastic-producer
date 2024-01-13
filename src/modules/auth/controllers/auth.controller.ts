import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequest } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: AuthRequest): Promise<any> {
    return await this.authService.generateToken(data);
  }
}

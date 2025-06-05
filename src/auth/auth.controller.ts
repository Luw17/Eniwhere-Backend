import { Controller, Post, Headers, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      const { username, userPassword } = loginDto;
      const authCode = await this.authService.login(username, userPassword);
      return { authCode };
    }
  
 @Post('logout')
  async logout(@Headers('authorization') authHeader: string): Promise<{ message: string }> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Authorization header missing or invalid', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
      await this.authService.logout(token);
      return { message: 'Logout successful' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  }
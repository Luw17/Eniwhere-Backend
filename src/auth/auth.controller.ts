import { Controller, Post, Headers, HttpException, HttpStatus, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      const { username, userPassword } = loginDto;
      const authCode = await this.authService.login(username, userPassword);
      return  authCode ;
    }
  

    @Post('verify-2fa')
    async verifyTwoFactorCode(
      @Body() body: { userId: number; code: string },
    ){
      const { userId, code } = body;

      const success = await this.authService.verifyTwoFactorCode(userId, code);
      if (!success) {
        throw new BadRequestException('Código inválido ou expirado');
      }

      return success ;
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
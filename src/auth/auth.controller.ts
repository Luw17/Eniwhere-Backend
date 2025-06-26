import { Controller, Post, Headers, HttpException, HttpStatus, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      const { username, userPassword } = loginDto;
      console.log('Login attempt:', { username, userPassword });
      const authCode = await this.authService.login(username, userPassword  );
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
  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    const { email } = body;
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    try {
      await this.authService.forgotPassword(email);
      return { message: 'Password reset link sent to your email' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    const { token, newPassword } = body;
    if (!token || !newPassword) {
      throw new BadRequestException('Email and new password are required');
    }

    try {
      await this.authService.resetPassword(token, newPassword);
      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
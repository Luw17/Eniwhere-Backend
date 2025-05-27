import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      console.log('teste');
      /*const userId = await this.authService.validateUser(loginDto);
      
      if (userId === -1 || userId == null) {
        return { message: 'credenciais erradas' };
      }
      const authCode = await this.authService.createSession(userId);
      console.log(authCode);
      return { message: 'Login bem-sucedido', authCode };*/
    }
  
    @Post('logout')
    logout(@Body('authCode') authCode: string) {
     // this.authService.revokeSession(authCode);
      return { message: 'Logout realizado com sucesso' };
    }
  }
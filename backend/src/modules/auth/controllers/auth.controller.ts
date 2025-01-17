import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/create_auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 200,
    description: 'User has been created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid parameters',
  })
  @ApiResponse({
    status: 409,
    description: 'User is already taken',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async create(@Res() res, @Body() authDto: AuthDto) {
    try {
      const singUp = await this.authService.createAuth(authDto);
      if (singUp?.token) {
        res.cookie(
          'jwt',
          singUp.token,
          this.authService.buildLoginCookieBase(),
        );

        return res.json({
          message: 'authentication successful',
        });
      }
      return res.status(500).json({
        message: 'authentication failed',
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: 'Email is already taken' });
      }
      console.log(error);

      throw error;
    }
  }

  @ApiOperation({ summary: 'Authentication User' })
  @ApiResponse({
    status: 200,
    description: 'User has been authenticated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid parameters',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/login')
  async login(@Res() res, @Body() authDto: AuthDto) {
    try {
      const logIn = await this.authService.postLogin(authDto);
      if (logIn?.token) {
        res.cookie('jwt', logIn.token, this.authService.buildLoginCookieBase());

        return res.json({
          message: 'authetication succeful',
        });
      }
      return res.status(500).json({
        message: 'authentication failed',
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

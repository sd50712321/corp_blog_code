import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthSignInDto } from './dto/auth-signIn.dto';
import { JwtPayload } from './dto/jwt-payload.interface';
import { AuthSignInResult } from './response/auth-signIn.response';
import { comparePassword } from 'src/utils/password';
import { ConfigService } from '@nestjs/config';

@Controller('/auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/signin')
  @ApiTags('인증')
  @ApiOperation({
    summary: '로그인합니다',
    description: 'accesstoken을 반환합니다',
  })
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<AuthSignInResult> {
    // const password = 'kinsRadlot1!';
    // const user_id = 'Radlot';
    const { user_id, password } = authSignInDto;
    const userLoginInfo = await this.usersService.getLoginInfo(user_id);
    if (!userLoginInfo) {
      throw new NotFoundException('User not found');
    }
    const { password: user_password, user_grade } = userLoginInfo;
    const compareResult = comparePassword(
      password,
      this.configService.get('SALT'),
      user_password,
    );
    if (!compareResult) {
      throw new UnauthorizedException('Invalid User');
    }

    if (userLoginInfo && compareResult) {
      const payload: JwtPayload = {
        user_id,
        user_grade,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      // await this.jwtService.verify(accessToken);
      // this.logger.log('accessToken: ' + accessToken);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    forwardRef(() =>
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: +configService.get('JWT_EXPIRATION_TIME'),
            // expiresIn: 1,
          },
        }),
      }),
    ),
    forwardRef(() => PassportModule.register({ defaultStrategy: 'jwt' })),
    forwardRef(() => ConfigModule),
    forwardRef(() => UsersModule),
  ],
  exports: [JwtStrategy, PassportModule, JwtAuthGuard, RolesGuard],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { LoggerModule as PinoLogggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLogggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}

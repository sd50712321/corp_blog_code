import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  private logger = new Logger('ValidationExceptionFilter', { timestamp: true });
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof BadRequestException
        ? exception.getStatus()
        : HttpStatus.UNPROCESSABLE_ENTITY;

    response.status(status).json({
      result: false,
      statusCode: status,
      message: exception.response.error,
      info:
        exception?.response?.message instanceof Array
          ? exception.response.message.map((data) => data.constraints)
          : exception?.response?.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('AllExceptionsFilter', { timestamp: true });
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException
        ? exception.message
        : exception instanceof QueryFailedError
        ? 'Internal Server Error'
        : 'Internal Server Error';

    this.logger.error('exception', exception);

    response.status(status).json({
      result: false,
      statusCode: status,
      message: error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

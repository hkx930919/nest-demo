/**
 * @description 捕获异常，将@Catch()参数列表设为空
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any = {}, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('---exception', exception.message, exception.response);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      message: exception?.response
        ? JSON.stringify(exception.response)
        : String(exception),
    });
  }
}

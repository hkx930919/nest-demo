import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/any-exception.filter';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controls/cats/cats.controller';
import { CatsModule } from './controls/cats/cats.module';
import { DogsController } from './controls/dogs/dogs.controller';
import { DogsModule } from './controls/dogs/dogs.module';
import { LoggerMiddleware } from './middlewares/log.middleware';
import { ReqMiddleware } from './middlewares/req.middleware';
import { RoleGuard } from './guards/roles.guard';
@Module({
  imports: [CatsModule, DogsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard, // 也在全局使用
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // 也在全局使用
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor, // 也在全局使用
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, ReqMiddleware).forRoutes(
      CatsController,
      DogsController,
      //'cats'
      // { path: 'cats', method: RequestMethod.GET },
    );
  }
}

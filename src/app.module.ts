import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/any-exception.filter';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controls/cats/cats.controller';
import { CatsModule } from './controls/cats/cats.module';
import { DogsController } from './controls/dogs/dogs.controller';
import { DogsModule } from './controls/dogs/dogs.module';
import { LoggerMiddleware } from './middlewares/log.middleware';
import { ReqMiddleware } from './middlewares/req.middleware';

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

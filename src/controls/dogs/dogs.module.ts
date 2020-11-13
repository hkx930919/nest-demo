import { LoggerMiddleware } from '../../middlewares/log.middleware';
import { DogsController } from './dogs.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from 'src/controls/cats/cats.module';
import { CatsService } from '../cats/cats.service';
@Module({
  // imports: [CatsModule], // 从catsModule导入的catsService会共享
  controllers: [DogsController],
})
export class DogsModule {}

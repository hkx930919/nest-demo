import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
@Global() // global模块的exports导出的CatsService无处不在，任何一个module都可以使用
@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'cats-service',
      useClass: CatsService,
    },
  ],
  exports: [
    {
      provide: 'cats-service',
      useClass: CatsService,
    },
  ],
})
export class CatsModule {}

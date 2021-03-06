import { CatsService } from './controls/cats/cats.service';
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('cats-service') private readonly catService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/path')
  sayPath(): string {
    return 'path';
  }
  @Get('/all-cats')
  findAll(): any {
    return {
      code: 1,
      data: this.catService.findAll(),
    };
  }
}

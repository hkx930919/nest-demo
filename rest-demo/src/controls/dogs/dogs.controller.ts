import {
  Controller,
  Get,
  Redirect,
  Res,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from '../cats/cats.service';
import { setResData } from '../../utils';
import { LoggerMiddleware } from 'src/middlewares/log.middleware';
@Controller('dogs')
export class DogsController {
  constructor(
    @Inject('cats-service') private readonly catService: CatsService,
  ) {}

  @Get()
  async findAll() {
    // res.status(HttpStatus.OK).send({
    //   code: 2,
    //   data: this.catService.findAll(),
    // });
    return setResData(this.catService.findAll());
  }
  @Get('r')
  @Redirect('https://baidu.com')
  redirect() {
    console.log('Redirect');
  }
}

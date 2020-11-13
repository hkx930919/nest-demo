import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { HTTP_CODE_ENUM } from '../../constants/response';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  Request,
  Header,
  Param,
  Res,
  Response,
  Ip,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { Cat, CatsService } from './cats.service';
import { setResData } from '../../utils';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Get()
  @Header('xxx', '11')
  findAll(@Request() request: Request): any {
    return setResData(this.catService.findAll());
  }
  @Post()
  create(@Body() cat: Cat) {
    this.catService.create(cat);
    return setResData(true);
  }
  @Get('/err')
  // 建议用类处理异常
  error() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }
  @Get('/err1')
  // 建议用类处理异常
  error1() {
    throw new Error('代码出错');
  }
}

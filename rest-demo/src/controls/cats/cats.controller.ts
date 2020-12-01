import { ValidationPipe } from './../../pipes/validate.pipe';
import { sleep } from './../../utils/util';
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
  UsePipes,
  UseInterceptors,
  Inject,
  // ValidationPipe,
} from '@nestjs/common';
import {
  Cat,
  CatsService,
  createCatSchema,
  CreateCatDto,
} from './cats.service';
import { setResData } from '../../utils';
import {
  ValidatePipes,
  JoiValidatePipe,
  // ValidationPipe,
} from '../../pipes/validate.pipe';
import { Roles } from '../../guards/meta.data';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
@Controller('cats')
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(
    @Inject('cats-service') private readonly catService: CatsService,
  ) {}
  @Get()
  @Header('xxx', '11')
  @UsePipes(new ValidatePipes())
  async findAll(@Request() request: Request): Promise<any> {
    await sleep(4000);
    return setResData(this.catService.findAll());
  }
  /**
   * Joi实例校验
   */
  // @Post()
  // @UsePipes(new JoiValidatePipe(createCatSchema))
  // create(@Body() cat: CreateCatDto) {
  //   this.catService.create(cat);
  //   return setResData(true);
  // }

  /**
   * 指定参数校验
   */
  // @Post()
  // create(@Body(new ValidationPipe()) cat: CreateCatDto) {
  //   this.catService.create(cat);
  //   return setResData(true);
  // }

  /**
   * 传入ValidationPipe实例校验
   */
  // @Post()
  // @UsePipes(new ValidationPipe())
  // create(@Body() cat: CreateCatDto) {
  //   this.catService.create(cat);
  //   return setResData(true);
  // }

  /**
   * 传入ValidationPipe类校验
   */
  @Post()
  @Roles('admin')
  @UsePipes(ValidationPipe)
  create(@Body() cat: CreateCatDto) {
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

import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

import { ObjectSchema } from '@hapi/joi';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// 管道，先拦截方法的调用参数,进行转换或是验证处理。在控制器之前执行
@Injectable()
export class ValidatePipes implements PipeTransform {
  transform(value: any, metaData: ArgumentMetadata) {
    console.log('--value', value);
    console.log('--metaData', metaData);

    return value;
  }
}

// 使用joi验证传过来的参数
@Injectable()
export class JoiValidatePipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metaData: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    console.log('--value', value);
    console.log('--metaData', metaData);
    if (error) {
      throw new BadRequestException(`Validation failed ${error}`);
    }
    return value;
  }
}

type Fun = (data: any) => unknown & any;
export class ValidationPipe implements PipeTransform {
  private toValidata(metaType: any): boolean {
    const types: Fun[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('管道');

    if (!metatype || !this.toValidata(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    console.log('---errors pipes', String(errors));

    if (errors.length > 0) {
      throw new BadRequestException(`Validation failed ${errors}`);
    }
    return value;
  }
}

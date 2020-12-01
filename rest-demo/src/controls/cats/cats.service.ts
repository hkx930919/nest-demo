import { Injectable } from '@nestjs/common';
import { ObjectSchema, object, string, number } from '@hapi/joi';
import {
  IsString,
  IsInt,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Max,
  Min,
} from 'class-validator';

export interface Cat {
  name: string;
  age: number;
  breed: string;
}
/**
 * joi的schema
 */
export const createCatSchema: ObjectSchema = object({
  name: string().min(2).max(30).required(),
  age: number().integer().min(0).max(30).required(),
  breed: string().min(2).max(30),
});

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, {
    message: '姓名不能超过50个字符',
  })
  @MinLength(2, {
    message: '姓名不能少于2个字符',
  })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Max(30, {
    message: '111',
  })
  @Min(0)
  age: number;

  @IsString()
  breed: string;
}
@Injectable()
export class CatsService {
  private cats: Cat[] = [];
  findAll(): Cat[] {
    return this.cats;
  }
  create(cat: Cat) {
    this.cats.push(cat);
  }
}

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class ValidatePips implements PipeTransform {
  transform(value: any, metaData: ArgumentMetadata) {
    console.log('--value', value);
    console.log('--metaData', metaData);

    return value;
  }
}

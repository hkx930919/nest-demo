import { HTTP_CODE_ENUM } from '../constants';
export interface ResponseData {
  data: any;
  code: HTTP_CODE_ENUM;
}

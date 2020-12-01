import { HTTP_CODE_ENUM } from '../constants';
import { ResponseData } from '../interfaces';
/**
 * @func 设置返回数据格式
 * @param data 业务数据
 * @param code 业务状态码
 */
export const setResData = (
  data,
  code = HTTP_CODE_ENUM.SUCCESS,
): ResponseData => ({
  code,
  data,
});

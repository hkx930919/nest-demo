import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * 实现CanActivate接口的守卫
 */
@Injectable()
export class RoleGuard implements CanActivate {
  // 反射器获取metadata 元数据
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get('roles', ctx.getHandler());
    console.log('--roles guard 守卫', roles);

    return true;
  }
}

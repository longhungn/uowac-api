import { createParamDecorator } from '@nestjs/common';

/**
 * Decorator to inject user object into controller methods
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export const UserParam = createParamDecorator((data, req) => {
  return req.user;
});

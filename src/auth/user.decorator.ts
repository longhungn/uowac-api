import { createParamDecorator } from '@nestjs/common';

export const UserParam = createParamDecorator((data, req) => {
  return req.user;
});

import { AppError } from './AppError';

export class UniqueConstraintError extends AppError {
  constructor(clazz: Function, propertyKey: string) {
    //prettier-ignore
    const message = `Unique constraint violation in ${clazz.name}.${propertyKey}`;
    super(message);
  }
}

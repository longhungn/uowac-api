import { AppError } from './AppError';
/**
 * Error class to be thrown when an operation would
 * cause a unique key constraint violation in the database
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class UniqueConstraintError extends AppError {
  constructor(clazz: Function, propertyKey: string) {
    //prettier-ignore
    const message = `Unique constraint violation in ${clazz.name}.${propertyKey}`;
    super(message);
  }
}

import { AppError } from './AppError';
/**
 * Error class to be thrown when an operation would
 * caused a foreign key constraint violation in the database
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class ForeignKeyError extends AppError {
  constructor(clazz: Function) {
    const message = `Foreign key constraint violation on ${clazz.name}`;
    super(message);
  }
}

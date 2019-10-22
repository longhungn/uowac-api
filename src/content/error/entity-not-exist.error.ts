import { AppError } from './AppError';
/**
 * Error class to be used when application cannot find a specified entity
 * in the database
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class EntityDoesNotExistError extends AppError {
  constructor(message) {
    super(message);
  }
}

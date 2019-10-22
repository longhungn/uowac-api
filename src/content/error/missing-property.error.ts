import { AppError } from './AppError';

/**
 * Error class to be thrown when a property on a ORM object
 * is undefined when it should not be.
 * Usually caused by ommitting a 'relations' clause in the query.
 * Mainly used to enhanced developer experience (better error reporting)
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class MissingRelationError extends AppError {
  constructor(classType: Function, propertyKey: string) {
    const message = `Instance of ${name} is missing property ${propertyKey}. Maybe you forgot to join relation?`;
    super(message);
  }
}

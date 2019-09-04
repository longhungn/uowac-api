import { AppError } from './AppError';

export class ForeignKeyError extends AppError {
  constructor(clazz: Function) {
    const message = `Foreign key constraint violation on ${clazz.name}`;
    super(message);
  }
}

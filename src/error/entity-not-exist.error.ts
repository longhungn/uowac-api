import { AppError } from './AppError';

export class EntityDoesNotExistError extends AppError {
  constructor(message) {
    super(message);
  }
}

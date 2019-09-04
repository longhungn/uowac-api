import { AppError } from './AppError';

export class MissingRelationError extends AppError {
  constructor(classType: Function, propertyKey: string) {
    const message = `Instance of ${name} is missing property ${propertyKey}. Maybe you forgot to join relation?`;
    super(message);
  }
}

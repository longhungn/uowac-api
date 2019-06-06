export class MissingRelationError extends Error {
  constructor(classType: Function, propertyKey: string) {
    const name = classType.name;
    const message = `Instance of ${name} is missing property ${propertyKey}. Maybe you forgot to join relation?`;
    super(message);

    Object.setPrototypeOf(this, Error.prototype);
  }
}

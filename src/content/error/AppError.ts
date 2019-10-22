/**
 * Base Error class to be used as parent for all other
 * application specific errors to inherit from
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class AppError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

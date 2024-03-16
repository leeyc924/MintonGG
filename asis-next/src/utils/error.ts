export interface CustomErrorType extends Error {
  status?: number;
}

export class CustomError extends Error {
  public status: number;

  constructor(name: string, status: number, message = 'Error occurred') {
    super(message);
    this.name = name;
    this.status = status;
  }

  static authError(message: string): CustomError {
    return new CustomError('AuthError', 401, message);
  }

  static forbiddenError(message: string): CustomError {
    return new CustomError('ForbiddenError', 403, `{name: ForbiddenError, status: 403, message: ${message}}`);
  }

  static notFoundError(): CustomError {
    return new CustomError('NotFoundError', 404, '잘못된 API 경로입니다.');
  }
}

export function handleCustomError(status: number, message: string): CustomErrorType {
  switch (status) {
    case 401:
      return CustomError.authError(message);
    case 403:
      return CustomError.forbiddenError(message);
    case 404:
      return CustomError.notFoundError();
    default:
      return new Error(message);
  }
}

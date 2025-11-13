export class CoreError extends Error {
  private _code: CoreErrorCode

  constructor(message: string, code: CoreErrorCode) {
    super(message)
    this._code = code
  }

  get code() {
    return this._code
  }
}

export enum CoreErrorCode {
  INVALID_FIELD_FORMAT = 'INVALID_FIELD_FORMAT',
  USER_POST_LIMIT_EXCEEDED = 'USER_POST_LIMIT_EXCEEDED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

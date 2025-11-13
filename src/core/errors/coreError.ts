export class CoreError {
  private _code: CoreErrorCode

  constructor(code: CoreErrorCode) {
    this._code = code
  }

  get code() {
    return this._code
  }
}

export enum CoreErrorCode {
  INVALID_FIELD_FORMAT = 'INVALID_FIELD_FORMAT',
  USER_POST_LIMIT_EXCEEDED = 'USER_POST_LIMIT_EXCEEDED',
  USER_EMAIL_POST_LIMIT_EXCEEDED = 'USER_EMAIL_POST_LIMIT_EXCEEDED',
  USER_WITH_EMAIL_NOT_FOUND = 'USER_WITH_EMAIL_NOT_FOUND',
  USER_WITH_ID_NOT_FOUND = 'USER_WITH_ID_NOT_FOUND',
  POST_WITH_ID_NOT_FOUND = 'POST_WITH_ID_NOT_FOUND',
  USER_LIKES_OWN_POSTS = 'USER_LIKES_OWN_POSTS',
}

import { CoreError, CoreErrorCode } from './coreError'

export class UserPostsLimitExceeded extends CoreError {
  private _userId: string

  constructor(userId: string) {
    super(CoreErrorCode.USER_POST_LIMIT_EXCEEDED)
    this._userId = userId
  }

  get userId() {
    return this._userId
  }
}

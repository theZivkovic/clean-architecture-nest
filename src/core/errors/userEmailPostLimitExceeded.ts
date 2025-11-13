import { CoreError, CoreErrorCode } from './coreError'

export class UserEmailPostsLimitExceeded extends CoreError {
  private _email: string

  constructor(email: string) {
    super(CoreErrorCode.USER_EMAIL_POST_LIMIT_EXCEEDED)
    this._email = email
  }

  get email() {
    return this._email
  }
}

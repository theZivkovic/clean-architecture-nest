import { CoreError, CoreErrorCode } from './coreError'

export class UserWithEmailNotFound extends CoreError {
  private _email: string

  constructor(email: string) {
    super(CoreErrorCode.USER_WITH_EMAIL_NOT_FOUND)
    this._email = email
  }

  get email() {
    return this._email
  }
}

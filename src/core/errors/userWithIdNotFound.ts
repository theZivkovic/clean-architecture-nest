import { CoreError, CoreErrorCode } from './coreError'

export class UserWithIdNotFound extends CoreError {
  private _id: string

  constructor(id: string) {
    super(CoreErrorCode.USER_WITH_ID_NOT_FOUND)
    this._id = id
  }

  get id() {
    return this._id
  }
}

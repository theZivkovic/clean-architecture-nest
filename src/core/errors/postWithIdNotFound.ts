import { CoreError, CoreErrorCode } from './coreError'

export class PostWithIdNotFound extends CoreError {
  private _id: string

  constructor(id: string) {
    super(CoreErrorCode.POST_WITH_ID_NOT_FOUND)
    this._id = id
  }

  get id() {
    return this._id
  }
}

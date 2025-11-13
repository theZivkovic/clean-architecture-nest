import { CoreError, CoreErrorCode } from './coreError'

export class UserLikesOwnPosts extends CoreError {
  private _userId: string

  constructor(userId: string) {
    super(CoreErrorCode.USER_LIKES_OWN_POSTS)
    this._userId = userId
  }

  get userId() {
    return this._userId
  }
}

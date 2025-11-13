import { CoreError, CoreErrorCode } from './coreError'

export class UserPostsLimitExceeded extends CoreError {
  constructor(userId: string) {
    super(
      `User with id: ${userId} exceeded the limit of posts.`,
      CoreErrorCode.USER_POST_LIMIT_EXCEEDED
    )
  }
}

import { CoreError, CoreErrorCode } from './coreError'

export class UserEmailPostsLimitExceeded extends CoreError {
  constructor(email: string) {
    super(
      `User with id: ${email} exceeded the limit of posts.`,
      CoreErrorCode.USER_POST_LIMIT_EXCEEDED
    )
  }
}

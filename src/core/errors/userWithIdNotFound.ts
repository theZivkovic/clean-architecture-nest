import { CoreError, CoreErrorCode } from './coreError'

export class UserWithIdNotFound extends CoreError {
  constructor(userId: string) {
    super(`User with id: ${userId} not found.`, CoreErrorCode.USER_NOT_FOUND)
  }
}

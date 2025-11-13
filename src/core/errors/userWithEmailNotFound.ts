import { CoreError, CoreErrorCode } from './coreError'

export class UserWithEmailNotFound extends CoreError {
  constructor(email: string) {
    super(`User with email: ${email} not found.`, CoreErrorCode.USER_NOT_FOUND)
  }
}

import { CoreError, CoreErrorCode } from './coreError'

export class OptimisticLockError extends CoreError {
  constructor() {
    super(CoreErrorCode.OPTIMISTIC_LOCK)
  }
}

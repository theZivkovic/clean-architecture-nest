import { CoreError, CoreErrorCode } from './coreError'

export class InvalidFieldFormat extends CoreError {
  constructor(fieldName: string, fieldValue: string) {
    super(`${fieldName}: ${fieldValue} is in invalid format`, CoreErrorCode.INVALID_FIELD_FORMAT)
  }
}

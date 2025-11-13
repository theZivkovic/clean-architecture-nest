import { CoreError, CoreErrorCode } from './coreError'

export class InvalidFieldFormat extends CoreError {
  private _fieldName: string
  private _fieldValue: string
  constructor(fieldName: string, fieldValue: string) {
    super(CoreErrorCode.INVALID_FIELD_FORMAT)
    this._fieldName = fieldName
    this._fieldValue = fieldValue
  }

  get fieldName() {
    return this.fieldName
  }

  get fieldValue() {
    return this.fieldValue
  }
}

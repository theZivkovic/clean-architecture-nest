import { CoreError } from '../../core/errors/coreError'

export type Result<T> =
  | {
      isSuccess: true
      value: T
    }
  | {
      isSuccess: false
      error: CoreError
    }

export function success<T>(obj: T): Result<T> {
  return { isSuccess: true, value: obj }
}

export function failure<T>(error: CoreError): Result<T> {
  return { isSuccess: false, error }
}

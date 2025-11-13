import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Result } from 'src/application/utils/result'
import { CoreErrorCode } from 'src/core/errors/coreError'

export function format<T>(result: Result<T>) {
  if (result.isSuccess) {
    return result.value
  }

  const errorObj = {
    message: result.error.message,
    code: result.error.code,
  }

  switch (result.error.code) {
    case CoreErrorCode.USER_NOT_FOUND:
      throw new NotFoundException(errorObj)
    case CoreErrorCode.USER_POST_LIMIT_EXCEEDED:
      throw new ForbiddenException(errorObj)
    case CoreErrorCode.INVALID_FIELD_FORMAT:
      throw new BadRequestException(errorObj)
    default:
      throw new InternalServerErrorException(errorObj)
  }
}

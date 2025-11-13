import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Result } from 'src/application/utils/result'
import { CoreErrorCode } from 'src/core/errors/coreError'
import { InvalidFieldFormat } from 'src/core/errors/invalidFieldFormat'
import { UserEmailPostsLimitExceeded } from 'src/core/errors/userEmailPostLimitExceeded'
import { UserLikesOwnPosts } from 'src/core/errors/userLikesOwnPosts'
import { UserPostsLimitExceeded } from 'src/core/errors/userPostLimitExceeded'
import { UserWithEmailNotFound } from 'src/core/errors/userWithEmailNotFound'
import { UserWithIdNotFound } from 'src/core/errors/userWithIdNotFound'

export function format<T>(result: Result<T>) {
  if (result.isSuccess) {
    return result.value
  }

  switch (result.error.code) {
    case CoreErrorCode.USER_WITH_EMAIL_NOT_FOUND:
      throw new NotFoundException(
        `User with email: ${(result.error as UserWithEmailNotFound).email} not found`
      )
    case CoreErrorCode.USER_WITH_ID_NOT_FOUND:
      throw new NotFoundException(
        `User with id: ${(result.error as UserWithIdNotFound).id} not found`
      )
    case CoreErrorCode.USER_POST_LIMIT_EXCEEDED:
      throw new ForbiddenException(
        `User with id: ${(result.error as UserPostsLimitExceeded).userId} exceeded the limit of posts`
      )
    case CoreErrorCode.USER_EMAIL_POST_LIMIT_EXCEEDED:
      throw new ForbiddenException(
        `User with email: ${(result.error as UserEmailPostsLimitExceeded).email} exceeded the limit of posts`
      )
    case CoreErrorCode.INVALID_FIELD_FORMAT:
      throw new BadRequestException(
        `Invalid field: ${(result.error as InvalidFieldFormat).fieldName} value: ${(result.error as InvalidFieldFormat).fieldValue}`
      )
    case CoreErrorCode.USER_LIKES_OWN_POSTS:
      throw new BadRequestException(
        `User with id: ${(result.error as UserLikesOwnPosts).userId} tried to like/unlike its own post`
      )
    default:
      throw new InternalServerErrorException(`Unhandled exception: ${JSON.stringify(result)}`)
  }
}

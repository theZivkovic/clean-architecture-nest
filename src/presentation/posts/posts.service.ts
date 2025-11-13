import { Injectable } from '@nestjs/common'
import { CreatePostUseCase } from 'src/application/useCases/createPost'
import { GetUserPostsUseCase } from 'src/application/useCases/getUserPosts'
import { CreatePostRequestDto } from './posts.dtos'
import { format } from '../utils/responseFormatter'
import { LikePostUseCase } from 'src/application/useCases/likePost'
import { UnlikePostUseCase } from 'src/application/useCases/unlikePost'

@Injectable()
export class PostsService {
  constructor(
    private readonly getUserPostsUseCase: GetUserPostsUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly likePostUseCase: LikePostUseCase,
    private readonly unlikePostUseCase: UnlikePostUseCase
  ) {}

  async createPost(createPostRequest: CreatePostRequestDto) {
    return format(
      await this.createPostUseCase.execute({
        userId: createPostRequest.userId,
        title: createPostRequest.title,
        body: createPostRequest.body,
      })
    )
  }

  async getUserPosts(userId: string) {
    return format(await this.getUserPostsUseCase.execute(userId))
  }

  async likePost(postId: string, userId: string) {
    return format(
      await this.likePostUseCase.execute({
        userId,
        postId,
      })
    )
  }

  async unlikePost(postId: string, userId: string) {
    return format(
      await this.unlikePostUseCase.execute({
        userId,
        postId,
      })
    )
  }
}

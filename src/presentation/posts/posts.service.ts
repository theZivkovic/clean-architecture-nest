import { Injectable } from '@nestjs/common'
import { CreatePostUseCase } from 'src/application/useCases/createPost'
import { GetUserPostsUseCase } from 'src/application/useCases/getUserPosts'
import { CreatePostRequestDto } from './posts.dtos'
import { format } from '../utils/responseFormatter'

@Injectable()
export class PostsService {
  constructor(
    private readonly getUserPostsUseCase: GetUserPostsUseCase,
    private readonly createPostUseCase: CreatePostUseCase
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
}

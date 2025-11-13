import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import type { CreatePostRequestDto } from './posts.dtos'
import { PostsService } from './posts.service'

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts')
  createPost(@Body() createPostRequest: CreatePostRequestDto) {
    return this.postsService.createPost(createPostRequest)
  }

  @Get('users/:userId/posts')
  getUserPosts(@Param('userId') userId: string) {
    return this.postsService.getUserPosts(userId)
  }
}

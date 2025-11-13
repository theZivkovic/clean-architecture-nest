import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
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

  @Post('posts/:postId/likes/:userId')
  likePost(@Param('postId') postId: string, @Param('userId') userId: string) {
    return this.postsService.likePost(postId, userId)
  }

  @Delete('posts/:postId/likes/:userId')
  unlikePost(@Param('postId') postId: string, @Param('userId') userId: string) {
    return this.postsService.unlikePost(postId, userId)
  }
}

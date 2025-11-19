import { InvalidFieldFormat } from '../errors/invalidFieldFormat'
import { ClassFields } from '../utils/classFields'
import { IIDGenerator } from '../interfaces/idGenerator'

const MAX_TITLE_LENGTH = 255
const MAX_BODY_LENGTH = 255

export class Post {
  id: string
  title: string
  body: string
  userId: string
  likeCount: number
  version: number

  private constructor(
    id: string,
    title: string,
    body: string,
    userId: string,
    likeCount: number,
    version: number
  ) {
    this.id = id
    this.setTitle(title)
    this.setBody(body)
    this.userId = userId
    this.likeCount = likeCount
    this.version = version
  }

  private setTitle(title: string) {
    if (title.length > MAX_TITLE_LENGTH) {
      throw new InvalidFieldFormat('post.title', title)
    }
    if (title.length < 0) {
      throw new InvalidFieldFormat('post.title', title)
    }
    this.title = title
  }

  private setBody(body: string) {
    if (body.length > MAX_BODY_LENGTH) {
      throw new InvalidFieldFormat('post.body', body)
    }
    if (body.length < 0) {
      throw new InvalidFieldFormat('post.body', body)
    }
    this.body = body
  }

  increaseLikes() {
    this.likeCount++
  }

  decreaseLikes() {
    if (this.likeCount === 0) {
      return
    }
    this.likeCount--
  }

  static create(post: Omit<ClassFields<Post>, 'id'>, idGenerator: IIDGenerator): Post {
    return new Post(
      idGenerator.generateId(),
      post.title,
      post.body,
      post.userId,
      post.likeCount,
      post.version
    )
  }

  static fromFields(post: ClassFields<Post>): Post {
    return new Post(post.id, post.title, post.body, post.userId, post.likeCount, post.version)
  }
}

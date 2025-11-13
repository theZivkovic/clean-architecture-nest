import { Result } from '../utils/result'

export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<Result<TOutput>>
}

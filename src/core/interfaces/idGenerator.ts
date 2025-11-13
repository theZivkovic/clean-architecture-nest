export interface IIDGenerator {
  generateId(): string
}

export const IIDGenerator = Symbol('IIDGenerator')

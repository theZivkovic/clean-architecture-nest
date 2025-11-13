import { InvalidFieldFormat } from '../errors/invalidFieldFormat'
import { ClassFields } from '../utils/classFields'
import { IIDGenerator } from '../interfaces/idGenerator'

export class User {
  id: string
  email: string
  firstName: string
  lastName: string

  private constructor(id: string, email: string, firstName: string, lastName: string) {
    this.id = id
    this.setEmail(email)
    this.setFirstName(firstName)
    this.setLastName(lastName)
  }

  private setEmail(email: string) {
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    if (!emailValid) {
      throw new InvalidFieldFormat('user.email', email)
    }
    this.email = email
  }

  private setFirstName(firstName: string) {
    if (firstName.length < 2) {
      throw new InvalidFieldFormat('user.firstName', firstName)
    }
    this.firstName = firstName
  }

  private setLastName(lastName: string) {
    if (lastName.length < 2) {
      throw new InvalidFieldFormat('user.lastName', lastName)
    }
    this.lastName = lastName
  }

  static create(user: Omit<ClassFields<User>, 'id'>, idGenerator: IIDGenerator): User {
    return new User(idGenerator.generateId(), user.email, user.firstName, user.lastName)
  }
}

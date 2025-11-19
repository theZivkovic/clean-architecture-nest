import { User } from 'src/core/models/user'
import { Column, Entity, PrimaryColumn, VersionColumn } from 'typeorm'

@Entity('users')
export class PgUser {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ type: 'varchar', length: 255 })
  firstName: string

  @Column({ type: 'varchar', length: 255 })
  lastName: string

  @VersionColumn()
  version: number

  toUser(): User {
    return User.fromFields({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      version: this.version,
    })
  }

  static fromUser(user: User) {
    const pgUser = new PgUser()
    pgUser.id = user.id
    pgUser.email = user.email
    pgUser.firstName = user.firstName
    pgUser.lastName = user.lastName
    pgUser.version = user.version
    return pgUser
  }
}

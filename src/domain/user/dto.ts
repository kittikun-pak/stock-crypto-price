import { User } from './model'

export type UserDto = {
    email: string
    balance: number
}

export const createUserDto = (user: User): UserDto => {
    return {
        email: user.getEmail(),
        balance: user.getBalance()
    }
}
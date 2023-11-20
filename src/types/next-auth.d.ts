import NextAuth, {DefaultUser} from "next-auth"

declare module "next-auth" {

    interface Session {
        user: User
    }

    export interface User extends DefaultUser {
        id: string
        username?: string
    }
}
import {NextAuthOptions, User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {hash, compare} from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "loginProvider",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {

        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          }
        })

        if (!user) return null

        const samePass = await compare(credentials?.password!, user?.password!)

        if (!samePass) return null

        return user as User
      }
    }),
    CredentialsProvider({
      id: "registerProvider",
      credentials: {
        firstName: {
          label: "First Name",
          type: "text"
        },
        lastName: {
          label: "Last Name",
          type: "text"
        },
        email: {
          label: "Email",
          type: "email"
        },
        username: {
          label: "Username",
          type: "text"
        },
        password: {
          label: "Password",
          type: "password"
        },
        password_confirmation: {
          label: "Confirm Password",
          type: "password"
        }
      },
      async authorize(credentials) {

        const {firstName, lastName, email, username, password, password_confirmation} = credentials as {
          firstName: string,
          lastName: string,
          email: string,
          username: string,
          password: string,
          password_confirmation: string
        }

        // 1. Validare

        // 2. Autenticitate

        const existingUser = await prisma.user.findFirst({
          where: {
            email: email
          }
        })

        if (existingUser) return null;


        // 3. Creare

        const hashedPassword = await hash(password, 10);
        const user = await prisma.user.create({
          data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
          }
        });

        return user as User | null;
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({session, token, user}) {
      session.user.id = token.sub as string
      session.user.username = token.username as string | undefined
      session.user.firstName = (token?.firstName as string) || undefined;
      session.user.lastName = (token?.lastName as string) || undefined;
      return session
    },
    async jwt({token, user, profile}) {
      if (user?.username) {
        token.username = user.username
      }
      if (user?.firstName) {
        token.firstName = user.firstName
      }
      if (user?.lastName) {
        token.lastName = user.lastName
      }
      return token
    }
  },
  pages: {
    signIn: "/login",
  }
}

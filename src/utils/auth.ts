import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

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
            name: "loginProvider",
            credentials: {
                email: {
                    label: "Email"
                },
                password: {
                    label: "Password"
                }
            },
            async authorize(credentials) {


                // Cauta user in baza de date si returneaza-l daca l-a gasit, in caz contrar null
                // CAUTA-L IN FUNCTIE DE EMAIL SI PASSWORD din param credentials

                return null // null sau utilizatorul
            }
        }),
        CredentialsProvider({
            name: "registerProvider",
            credentials: {
                email: {
                    label: "Email"
                },
                username: {
                    label: "Username"
                },
                password: {
                    label: "Password"
                },
                password_confirmation: {
                    label: "Confirm Password"
                }
            },
            async authorize(credentials) {

                // Validezi datele


                // Verifici daca este utilizatorul in baza de date


                // Creezi noul utilizator si-l returnezi

                return null // null sau utilizatorul
            }
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({session, token}) {
            session.user.id = token.sub as string;
            return session
        }
    },
    pages: {
        signIn: "/login",
    }
}

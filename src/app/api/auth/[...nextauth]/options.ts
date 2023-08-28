import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    // debug: true,
    // adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: 'Username',
        //             type: 'text',
        //             placeholder: 'Ex john@doe.com'
        //         },
        //         password: {
        //             label: 'Password',
        //             type: 'password',
        //             placeholder: '********'
        //         }
        //     },
        //     async authorize(credentials){ 
        //         const user = {id: 1, name: 'abdelhak', password: '12345678'}

        //         if(credentials?.username === user.name && credentials.password){
        //             return user 
        //         } else {
        //             return null
        //         }

        //     }
        // })
    ],
    callbacks: {
        session: async ({ session, token }) => ({
            ...session,
            user: {
              ...session.user,
              id: token.sub,
            },
          }),

    }
}
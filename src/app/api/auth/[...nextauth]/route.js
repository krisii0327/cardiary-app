import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";
import { User } from "@/app/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/login',
    },
    providers: [
        GoogleProvider({
            id: 'google',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',

            credentials: {
              username: { label: "Email", type: "email", placeholder: "Email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);

                const user = await User.findOne({email});
                const passwordOk = user && bcrypt.compareSync(password, user.password)

                if(passwordOk) {
                    return user;
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
          return token
        },
        async session({ session, user, token }) {
          return {
            userCredentials: {...session.user }
          }
          //return {...session, ...token}
        },
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
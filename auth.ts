import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/config/db";
import { usersTable, accountsTable, sessionsTable, verificationTokensTable } from "@/config/schema";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: accountsTable,
    sessionsTable: sessionsTable,
    verificationTokensTable: verificationTokensTable,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const currentUsers = await db.select().from(usersTable).where(eq(usersTable.email, credentials.email as string));
        const user = currentUsers[0];
        
        if (!user || !user.password) return null;
        
        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (passwordsMatch) return { id: user.id.toString(), email: user.email, name: user.name, image: user.image };
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  }
});

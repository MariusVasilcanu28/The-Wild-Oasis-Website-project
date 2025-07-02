import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

// Define config separately
export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }

        return true;
      } catch {
        return false;
      }
    },

    async session({ session, user, token }) {
      const guest = await getGuest(session.user.email);
      if (guest) {
        session.user.guestId = guest.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// Pass config into NextAuth
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

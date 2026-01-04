import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdminPanel) {
        if (isLoggedIn) {
            // Add admin role check here if needed
            // @ts-ignore
            if (auth.user.role !== 'admin') return Response.redirect(new URL('/', nextUrl));
            return true;
        }
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    async session({ session, token }) {
        if (token && session.user) {
            // @ts-ignore
            session.user.role = token.role;
            // @ts-ignore
            session.user.id = token.id;
        }
        return session;
    },
    async jwt({ token, user }) {
        if (user) {
            // @ts-ignore
            token.role = user.role;
            token.id = user.id;
        }
        return token;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

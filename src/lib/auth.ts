import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';

// When set, OAuth callbacks are routed through this base URL (production)
// so only one redirect URI needs to be registered in Google Cloud Console.
const callbackBaseUrl = process.env.AUTH_CALLBACK_BASE_URL || process.env.NEXTAUTH_URL;

// When set, cookies are scoped to this domain so sessions are shared
// across subdomains (e.g. production + preview environments).
const cookieDomain = process.env.AUTH_COOKIE_DOMAIN || undefined;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      ...(callbackBaseUrl && callbackBaseUrl !== process.env.NEXTAUTH_URL
        ? {
            authorization: {
              params: {
                redirect_uri: `${callbackBaseUrl}/api/auth/callback/google`,
              },
            },
            token: {
              params: {
                redirect_uri: `${callbackBaseUrl}/api/auth/callback/google`,
              },
            },
          }
        : {}),
    }),
  ],
  debug: true,
  logger: {
    error(code, metadata) {
      console.error('[NextAuth Error]', code, JSON.stringify(metadata, null, 2));
    },
    warn(code) {
      console.warn('[NextAuth Warn]', code);
    },
    debug(code, metadata) {
      console.log('[NextAuth Debug]', code, JSON.stringify(metadata, null, 2));
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('[NextAuth] signIn callback:', {
        userId: user?.id,
        provider: account?.provider,
        email: profile?.email,
      });
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After sign-in, always go to dashboard (not back to the landing page)
      if (url === baseUrl || url === `${baseUrl}/` || url === '/') {
        return `${baseUrl}/dashboard`;
      }
      // Allow callbacks on the same origin
      if (url.startsWith(baseUrl)) return url;
      // Allow redirects to any *.kotvim-code.luposec.io subdomain
      // so that production OAuth callbacks can redirect back to previews
      if (cookieDomain) {
        try {
          const urlObj = new URL(url);
          if (urlObj.hostname.endsWith(cookieDomain)) {
            return url;
          }
        } catch {
          // invalid URL, fall through
        }
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return `${baseUrl}/dashboard`;
    },
  },
  events: {
    async signIn({ user }) {
      console.log('[NextAuth] Sign in event for user:', user?.email);
    },
  },
  // Explicit cookie config to fix OAuth behind reverse proxy (nginx ingress
  // terminates TLS, so internal traffic is HTTP). Without this, NextAuth
  // auto-detects HTTPS from NEXTAUTH_URL and uses __Secure- prefixed cookies,
  // which can break the state/CSRF validation during the OAuth callback.
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        ...(cookieDomain ? { domain: cookieDomain } : {}),
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
        ...(cookieDomain ? { domain: cookieDomain } : {}),
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        ...(cookieDomain ? { domain: cookieDomain } : {}),
      },
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: 900,
        ...(cookieDomain ? { domain: cookieDomain } : {}),
      },
    },
    state: {
      name: 'next-auth.state',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: 900,
        ...(cookieDomain ? { domain: cookieDomain } : {}),
      },
    },
    nonce: {
      name: 'next-auth.nonce',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        ...(cookieDomain ? { domain: cookieDomain } : {}),
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

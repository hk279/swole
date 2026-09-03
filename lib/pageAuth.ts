import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

/**
 * Guards a page on the server so its markup and data queries never run for a
 * signed-out visitor. The client-side `useSession({ required: true })` in
 * Header still handles sessions that expire while the page is open.
 *
 * The resolved session is handed to `SessionProvider` via `pageProps`, which
 * also removes the unauthenticated flash on first paint.
 */
export const requireSession: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};

/** Sends already-signed-in visitors away from the login page. */
export const redirectIfSignedIn: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session != null) {
    return {
      redirect: {
        destination: "/log",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

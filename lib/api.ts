import { Prisma } from "@prisma/client";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { ZodType, z } from "zod";
import { authOptions } from "./auth";
import { NotFoundError } from "./errors";

/**
 * Wraps a handler so a thrown error becomes a status code instead of an
 * unhandled rejection. Internal errors never leak their message to the client.
 */
export const withErrorHandling =
  (handler: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
        return;
      }

      // A well-formed id that points at a row which does not exist, e.g.
      // favouriting an exercise type that has since been deleted.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      console.error(`${req.method} ${req.url} failed`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

/**
 * Resolves the signed-in user's email, or responds 401 and returns null.
 *
 * Uses `getServerSession` rather than `getSession` from `next-auth/react`: the
 * latter is the client helper and issues a real HTTP request back to
 * `/api/auth/session` on every call, which also makes the whole API depend on
 * NEXTAUTH_URL exactly matching the running host.
 */
export const requireUserEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string | null> => {
  const session = await getServerSession(req, res, authOptions);
  const email = session?.user?.email;

  if (email == null) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  return email;
};

/**
 * Parses untrusted input, responding 400 with the field errors when invalid.
 */
const parseInput = <T>(
  res: NextApiResponse,
  schema: ZodType<T>,
  input: unknown,
  label: string
): T | null => {
  const result = schema.safeParse(input);

  if (!result.success) {
    res.status(400).json({
      error: `Invalid request ${label}`,
      details: z.flattenError(result.error).fieldErrors,
    });
    return null;
  }

  return result.data;
};

export const parseBody = <T>(
  res: NextApiResponse,
  schema: ZodType<T>,
  body: unknown
): T | null => parseInput(res, schema, body, "body");

export const parseQuery = <T>(
  res: NextApiResponse,
  schema: ZodType<T>,
  query: unknown
): T | null => parseInput(res, schema, query, "query");

export const methodNotAllowed = (res: NextApiResponse, allowed: string[]) => {
  res.setHeader("Allow", allowed);
  res.status(405).json({ error: "Method not allowed" });
};

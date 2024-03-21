import { NextRequest } from "next/server";

export default function getSessionEmail(req: NextRequest) {
  const email = req.headers.get("sessionEmail");

  if (email === null) {
    throw new Error("Session email not found in headers");
  }

  return email;
}

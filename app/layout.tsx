import { ReactNode } from "react";
import "../styles/global.css";

export default async function RootLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }}>{children}</body>
    </html>
  );
}

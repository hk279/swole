import { ReactNode } from "react";
import styles from "../../styles/app/Layout.module.scss";
import Header from "../../components/layout/Header";
import { getCurrentUser } from "../../lib/session";
import Providers from "../../context/Providers";

export default async function PrivateLayout({
  children,
}: {
  children?: ReactNode;
}) {
  const user = await getCurrentUser();
  const userEmail = user?.email ?? "User email not found";

  return (
    <Providers>
      <Header userEmail={userEmail} />
      <div className={styles.pageContent}>{children}</div>
    </Providers>
  );
}

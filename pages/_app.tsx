import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    // Created per app instance so a client is never shared across SSR requests.
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default MyApp;

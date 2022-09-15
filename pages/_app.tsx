import { Auth0Provider } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Auth0Provider
            domain="dev-oh5-mdkv.us.auth0.com"
            clientId="i3xx9hDgexfka03sEl67yJwKTjdTjSBg"
            redirectUri={"http://localhost:3000"}
        >
            <Component {...pageProps} />
        </Auth0Provider>
    );
};

export default MyApp;

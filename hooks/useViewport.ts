import { useSyncExternalStore } from "react";

const subscribe = (onStoreChange: () => void) => {
    window.addEventListener("resize", onStoreChange);
    return () => window.removeEventListener("resize", onStoreChange);
};

const getSnapshot = () => window.innerWidth;

// Width is 0 on the server so the first paint matches the SSR markup.
const getServerSnapshot = () => 0;

const useViewport = () =>
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useViewport;

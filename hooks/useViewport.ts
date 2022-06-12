import { useState, useEffect } from "react";

const useViewport = () => {
    const [width, setWidth] = useState<number>(99999);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return width;
}

export default useViewport
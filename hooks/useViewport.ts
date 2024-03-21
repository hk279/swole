import { useState, useEffect } from "react";

const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    const debouncedHandleResize = debounce(handleResize, 50);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return width;
};

const debounce = (func: Function, delay: number): (() => void) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(), delay);
  };
};

export default useViewport;

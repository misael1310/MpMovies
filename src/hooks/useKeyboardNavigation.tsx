import { useEffect, DependencyList } from "react";

type KeyHandlerMap = Record<string, () => void | Promise<void>>;

const useKeyboardNavigation = (
  handlers: KeyHandlerMap,
  deps: DependencyList = [],
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const { key } = event;
      void handlers[key]();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // Because we extend the dependency array dynamically, we disable ESLint checking for this line.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlers, ...deps]);
};

export { useKeyboardNavigation };

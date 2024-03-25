import React, { useEffect } from "react";

import { createContext, useRef, useState, useContext } from "react";

interface IsKeyboardUserContextValues {
  isKeyboardUserRef: React.MutableRefObject<boolean>;
  isKeyboardUser: boolean;
}

const IsKeyboardUserContext = createContext<
  IsKeyboardUserContextValues | undefined
>(undefined);

export const IsKeyboardUserProvider: React.FC<
  React.PropsWithChildren<{ state?: boolean }>
> = ({ children, state }) => {
  const isAppLoaded = useRef(false),
    isKeyboardUserRef = useRef(false),
    [isKeyboardUser, setIsKeyboardUser] = useState(false),
    keys = new Set([ " ", "Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]); // prettier-ignore

  const createOverlay = () => {
    const element = document.createElement("div");
    element.role = "presentation";
    element.id = "mouseListener";
    element.style.cssText =
      "position: fixed; inset: 0; width: 100%; height: 100%; z-index: 9999; background: transparent;";
    document.body.appendChild(element);

    return element;
  };

  const changeValue = (state: boolean | undefined, bool: boolean) =>
    state ? setIsKeyboardUser(bool) : (isKeyboardUserRef.current = bool);

  useEffect(() => {
    if (!isAppLoaded.current) {
      let overlay: HTMLDivElement;
      const handleIfKeyboard = (e: KeyboardEvent) => {
          if (keys.has(e.key)) {
            changeValue(state, true);

            overlay = createOverlay();

            document.removeEventListener("keydown", handleIfKeyboard);
            overlay.addEventListener("mousedown", handleIfMouse);
          }
        },
        handleIfMouse = () => {
          changeValue(state, false);

          overlay.removeEventListener("mousedown", handleIfMouse);
          document.body.removeChild(overlay);

          document.addEventListener("keydown", handleIfKeyboard);
        };

      // Initial Listener
      document.addEventListener("keydown", handleIfKeyboard);

      return () => {
        document.removeEventListener("keydown", handleIfKeyboard);
        if (overlay) {
          document.body.removeChild(overlay);
          overlay.removeEventListener("mousedown", handleIfMouse);
        }
      };
    }

    isAppLoaded.current = true;
  }, [state]);

  return (
    <IsKeyboardUserContext.Provider
      value={{
        isKeyboardUserRef,
        isKeyboardUser,
      }}
    >
      {children}
    </IsKeyboardUserContext.Provider>
  );
};

export const useIsKeyboardUser = () => {
  const context = useContext(IsKeyboardUserContext);
  if (!context)
    throw new Error(
      "useIsKeyboardUser must be used within a IsKeyboardUserProvider."
    );

  return context;
};

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
  const isKeyboardUserRef = useRef(false),
    [isKeyboardUser, setIsKeyboardUser] = useState(false),
    keys = [" ", "Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  const isAppLoaded = useRef(false);
  useEffect(() => {
    if (!isAppLoaded.current) {
      let overlay: HTMLDivElement;
      const handleIfKeyboard = (e: KeyboardEvent) => {
          if (keys.includes(e.key)) {
            state
              ? setIsKeyboardUser(true)
              : (isKeyboardUserRef.current = true);

            overlay = document.createElement("div");
            overlay.role = "presentation";
            overlay.id = "mouseListener";
            overlay.style.cssText =
              "position: fixed; inset: 0; width: 100%; height: 100%; z-index: 9999; background: transparent;";
            document.body.appendChild(overlay);

            document.removeEventListener("keydown", handleIfKeyboard);
            overlay.addEventListener("mousedown", handleIfMouse);
          }
        },
        handleIfMouse = () => {
          document.body.removeChild(overlay);

          state
            ? setIsKeyboardUser(false)
            : (isKeyboardUserRef.current = false);

          overlay.removeEventListener("mousedown", handleIfMouse);
          document.addEventListener("keydown", handleIfKeyboard);
        };

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

export default useIsKeyboardUser;

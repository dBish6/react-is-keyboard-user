import React from "react";
import { renderHook, fireEvent } from "@testing-library/react";
import { IsKeyboardUserProvider, useIsKeyboardUser } from ".";

const mockProviderRef: React.FC<React.PropsWithChildren<{}>> = ({
    children,
  }) => <IsKeyboardUserProvider>{children}</IsKeyboardUserProvider>,
  mockProviderState: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <IsKeyboardUserProvider state>{children}</IsKeyboardUserProvider>
  );

describe("IsKeyboardUser", () => {
  it("Ref: Should update isKeyboardUserRef on keyPress and then listen for mouse clicks.", () => {
    const { result } = renderHook(() => useIsKeyboardUser(), {
        wrapper: mockProviderRef,
      }),
      isKeyboardUserRef = result.current.isKeyboardUserRef;

    expect(isKeyboardUserRef.current).toBeDefined();

    fireEvent.keyDown(document.body, { key: "Tab" });
    expect(isKeyboardUserRef.current).toBe(true);

    expect(document.getElementById("mouseListener")).toBeDefined();
  });

  it("useState: Toggles isKeyboardUser on keyboard and mouse events.", () => {
    const { result } = renderHook(() => useIsKeyboardUser(), {
      wrapper: mockProviderState,
    });

    expect(result.current.isKeyboardUser).toBeDefined();

    // When listening for keyboard.
    fireEvent.keyDown(document.body, { key: "Tab" });
    expect(result.current.isKeyboardUser).toBe(true);

    // When listening for mouse.
    fireEvent.mouseDown(document.getElementById("mouseListener")!);
    expect(result.current.isKeyboardUser).toBe(false);

    // When listening for keyboard again.
    fireEvent.keyDown(document.body, { key: "ArrowUp" });
    expect(result.current.isKeyboardUser).toBe(true);
  });
});

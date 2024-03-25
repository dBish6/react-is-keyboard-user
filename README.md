# react-user-input-detection
A lightweight React hook for detecting the user's input method within a web application. This package provides a simple way to track whether a user is interacting via a keyboard or mouse, enhancing accessibility and the user experience of your application. The package also includes a context provider necessary for the hook's functionality. Regardless of whether the user begins with a keyboard and later transitions to a mouse, the hook dynamically detects these changes, recognizing the user's input method as mouse-based. This monitoring ensures accurate tracking of user interaction.

## Installation
```
$ npm i react-user-input-detection
```

## Explanation
To utilize the hook, you must set up the context provider. The hook provides `isKeyboardUser` and `isKeyboardUserRef`, so you have the option to choose the state version or the ref version. When using the useState version, you must tell the provider to be stateful by providing the `state prop` to the IsKeyboardUserProvider. Use the useState version when re-rendering or DOM manipulation is necessary for your particular use case and anything other than that use the useRef version.

### Provider
```
...
import { IsKeyboardUserProvider } from "react-user-input-detection";

ReactDOM.createRoot(document.getElementById("root")).render(
  <IsKeyboardUserProvider> // Uses the useRef version.
    <App />
  </IsKeyboardUserProvider>
);
```
```
...
import { IsKeyboardUserProvider } from "react-user-input-detection";

ReactDOM.createRoot(document.getElementById("root")).render(
  <IsKeyboardUserProvider state> // Uses the useState version.
    <App />
  </IsKeyboardUserProvider>
);
```

### Hook
```
import { useIsKeyboardUser } from "react-user-input-detection";

function App() {
  const { isKeyboardUserRef } = useIsKeyboardUser();

  return (
    <button
      onClick={() =>
        isKeyboardUserRef.current ? console.log("keyboard") : console.log("mouse") // useRef version use case.
      }
    >
      Keyboard detection!
    </button>
  );
}

export default App;
```
```
import { useIsKeyboardUser } from "react-user-input-detection";

function App() {
  const { isKeyboardUser } = useIsKeyboardUser();

  return <p>{isKeyboardUser ? "keyboard" : "mouse"}</p>; // useState version use case.
}

export default App;
```

## Contributing
Contributions are welcome! Keep in mind I'd like to keep the package bundle size as small as possible.

### To Get Started
- Fork this repository.
- Create a new branch.
- install the dependencies with `npm install`.
- Do a `npm run test` to see if you're all set.
- For the dev environment, `npm run dev` and there you go!

```
$ npm install
$ npm run test
$ npm run dev
```

## License
This project is licensed under the [MIT](https://github.com/dBish6/react-user-input-detection/blob/master/LICENSE) License.

## Support Me
If you find this package helpful consider buying me a coffee, your support helps me stay motivated!

<a href="https://www.buymeacoffee.com/dBish" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

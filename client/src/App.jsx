import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;

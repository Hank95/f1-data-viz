import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { F1DataProvider } from "./context/F1DataContext";
import "./App.css";

function App() {
  return (
    <F1DataProvider>
      <RouterProvider router={router} />
    </F1DataProvider>
  );
}

export default App;

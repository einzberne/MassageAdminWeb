import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/register/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register/>,
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
  </div>;
}

export default App

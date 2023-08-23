import { createBrowserRouter, RouterProvider } from "react-router-dom"

import {Layout, Home, About, Events, Students, Merchandise, Login, Register, Error} from "./pages"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/events",
        element: <Events/>
      },
      {
        path: "/students",
        element: <Students/>
      },
      {
        path: "/merchandise",
        element: <Merchandise/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/error",
        element: <Error/>
      }
    ]
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
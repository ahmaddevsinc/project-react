import Dashboard from "../components/Dashboard";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

export const Nav = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
];

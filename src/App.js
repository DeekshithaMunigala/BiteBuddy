import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import "../index.css";
// import About from "./pages/About";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Contact from "./pages/Contact";
// import RestaurantMenu from "./components/RestaurantMenu";

const About = lazy(() => import("./pages/About.js"));
const Cart = lazy(() => import("./pages/Cart.js"));
const Login = lazy(() => import("./pages/Login.js"));
const Contact = lazy(() => import("./pages/Contact.js"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu.js"));

import UserContext from "./utils/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore.js";

const App = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const data = {
      name: "Hi👋 Deekshitha",
    };

    setUserInfo(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      {/* <UserContext.Provider value={{ loggedInUser: "Restaurant" }}> */}
      <UserContext.Provider value={{ loggedInUser: userInfo, setUserInfo }}>
        <div>
          <UserContext.Provider value={{ loggedInUser: userInfo }}>
            <Header />
          </UserContext.Provider>

          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense
            fallback={
              <h1 className="flex justify-center items-center h-[70vh] font-medium text-3xl">
                About is loading
              </h1>
            }
          >
            <About />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense
            fallback={
              <h1 className="flex justify-center items-center h-[70vh] font-medium text-3xl">
                cart is loading
              </h1>
            }
          >
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense
            fallback={
              <h1 className="flex justify-center items-center h-[70vh] font-medium text-3xl">
                Login is loading
              </h1>
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense
            fallback={
              <h1 className="flex justify-center items-center h-[70vh] font-medium text-3xl">
                Contact is loading
              </h1>
            }
          >
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:id",
        element: (
          <Suspense
            fallback={
              <h1 className="flex justify-center items-center h-[70vh] font-medium text-3xl">
                RestaurantMenu is Loading
              </h1>
            }
          >
            <RestaurantMenu />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Welcome user",
});

export default UserContext;

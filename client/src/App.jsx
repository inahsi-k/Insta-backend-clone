import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Signup from "./components/screens/Signup";
import Signin from "./components/screens/Signin";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";

export const UserContext = createContext();

const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }
  return state;
};

const initialState = null;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;



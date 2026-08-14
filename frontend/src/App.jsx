import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setUser, setloading } from "./redux/features/user";
import { useDispatch } from "react-redux";
import Hero from "./pages/Hero";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import Resume from "./pages/Resume";

const App = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      try {
        dispatch(setloading(true));

        const res = await axios.get("http://localhost:3000/api/auth/get-me", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setloading(false));
      }
    };

    checkUser();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/resume" element={<Resume />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;

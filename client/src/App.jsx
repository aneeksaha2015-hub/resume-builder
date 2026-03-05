import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import api from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  const { loading, token } = useSelector(state => state.auth);

  useEffect(() => {
    const getUserData = async () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        dispatch(setLoading(false));
        return;
      }

      try {
        const { data } = await api.get("/users/data", {
          headers: { Authorization: `Bearer ${savedToken}` }
        });

        if (data.user) {
          dispatch(login({ token: savedToken, user: data.user }));
        }
        dispatch(setLoading(false));
      } catch (err) {
        console.log(err.message);
        dispatch(setLoading(false));
      }
    };

    getUserData();
  }, [dispatch]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;

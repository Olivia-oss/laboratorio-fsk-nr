import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignIn from "../pages/auth/SignIn";
import Home from "../pages/home/Home";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

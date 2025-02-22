import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignIn from "../pages/auth/SignIn";
import Home from "../pages/home/Home";
import CreatePatient from "../pages/home/CreatePatient";
import ViewPatient from "../pages/home/viewPatient";
import EditPatient from "../pages/home/EditPatient";
import CreateSymptom from "../pages/symptom/CreateSymptom";
import { useSelector } from "react-redux";
export const AppRouter = () => {
  const isAuth = useSelector((state) => !!state.auth.login);

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createPatient" element={<CreatePatient />} />
          <Route path="/patient/view" element={<ViewPatient />} />
          <Route path="/patient/edit" element={<EditPatient />} />
          <Route path="/symptom/create" element={<CreateSymptom />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/signIn" element={<SignIn />} />
        </>
      )}
    </Routes>
  );
};

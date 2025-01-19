import { useNavigate } from "react-router-dom";
import HeaderLab from "./components/HeaderLab";
import "./styles/auth.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailRegex, verifyPasswordMsg } from "../../utils/verification";
import { requstLogin } from "../../redux/auth";
import LoadingIcon from "../../shared/IconLoadin";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const [error, setError] = useState();

  const [form, setForm] = useState({
    loginEmail: "",
    loginPasword: "",
  });

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/home");
    }
    if (status === "failed") {
      setError("El correo o contraseña son incorrectas");
    }
  }, [navigate, status]);

  const handleRouter = (route) => {
    navigate(route);
  };

  const changeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handLogin = () => {
    if (
      !verifyEmailRegex(form.loginEmail) ||
      verifyPasswordMsg(form.loginPasword) != ""
    ) {
      setError("El correo o contraseña son incorrectas");
      return;
    }
    setError("El correo o contraseña son incorrectas");

    dispatch(
      requstLogin({
        email: form.loginEmail,
        password: form.loginPasword,
      })
    );
  };

  return (
    <div className="ct-auth">
      {status === "loading" ? (
        <LoadingIcon />
      ) : (
        <div className="ct-auth-item">
          <div className="ct-verification">
            <h3>Iniciar Sesion</h3>
            <label>Correo</label>
            <input
              placeholder="Ingresa un correo"
              onChange={changeForm}
              type="email"
              name="loginEmail"
              value={form.loginEmail}
            />
            <label>Contraseña</label>
            <input
              placeholder="Ingresa una contraseña"
              type="password"
              value={form.loginPasword}
              name="loginPasword"
              onChange={changeForm}
            />

            <label className="lb-error">{error}</label>

            <button className="btn-login" onClick={handLogin}>
              Iniciar Sesion
            </button>
            <button
              className="btn-signIn"
              onClick={() => handleRouter("signIn")}
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
      <HeaderLab />
    </div>
  );
}

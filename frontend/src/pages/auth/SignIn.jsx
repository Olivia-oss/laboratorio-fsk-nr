import { useNavigate } from "react-router-dom";
import HeaderLab from "./components/HeaderLab";
import { verifyEmailRegex, verifyPasswordMsg } from "../../utils/verification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requstSingIn } from "../../redux/auth";

export default function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });

  const [email, setEmail] = useState({
    value: "",
    error: "",
  });

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/home");
    }
  }, [navigate, status]);

  const handleRouter = (route) => {
    navigate(route);
  };

  const changePassword = (e) => {
    const error = verifyPasswordMsg(e.target.value);

    setPassword({
      value: e.target.value,
      error,
    });
  };

  const changeEmail = (e) => {
    setEmail({
      ...email,
      value: e.target.value,
    });
  };

  const handleSingIn = () => {
    if (!verifyEmailRegex(email.value)) {
      setEmail({
        ...email,
        error: "Ingresa un correo valido",
      });
      return;
    }
    setEmail({
      ...email,
      error: "",
    });
    if (password.error === "") {
      dispatch(
        requstSingIn({
          email: email.value,
          password: password.value,
        })
      );
    }
  };

  return (
    <div className="ct-auth">
      <div className="ct-auth-item">
        <div className="ct-verification">
          <h3>Registrarse</h3>
          <label>Correo</label>
          <input
            placeholder="Ingresa un correo"
            type="email"
            value={email.value}
            onChange={changeEmail}
          />
          <label className="lb-error">{email.error}</label>
          <label>Contraseña</label>
          <input
            placeholder="Ingresa una contraseña"
            type="password"
            onChange={changePassword}
          />
          <label className="lb-error">{password.error}</label>
          {status === "failed" && (
            <label className="lb-error">No se pudo registrar</label>
          )}
          <button className="btn-login" onClick={handleSingIn}>
            Registrarse
          </button>
          <button className="btn-signIn" onClick={() => handleRouter("/")}>
            Iniciar Sesion
          </button>
        </div>
      </div>
      <HeaderLab />
    </div>
  );
}

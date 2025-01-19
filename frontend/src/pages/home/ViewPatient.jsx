import { useLocation, useNavigate } from "react-router-dom";
import { requstDeletePatinet, resetStatusPatient } from "../../redux/patient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ViewPatient() {
  const location = useLocation();
  const patient = location.state ? location.state.patient : {};
  const navigate = useNavigate();
  const dispach = useDispatch();
  const status = useSelector((state) => state.patinets.status);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "succeeded") {
      dispach(resetStatusPatient());
      navigate("/home");
    }
    if (status === "failed") {
      setError("No se pudo eliminar, intente mas tarde");
    }
  }, [dispach, navigate, status]);

  const handleOpenEdit = () => {
    dispach(resetStatusPatient());
    navigate("/patient/edit", {
      state: { patient: patient },
    });
  };

  const handleDelete = () => {
    dispach(requstDeletePatinet(patient._id));
  };
  return (
    <div className="ct-view-patient">
      <h3>Paciente</h3>
      <label>Nombre</label>
      <p>
        {patient.name} {patient.lastname}
      </p>
      <label>Direccion</label>
      <p>{patient.address}</p>
      <label>Fecha de nacimiento</label>
      <p>{patient.birthdate}</p>
      <label>Telefonos</label>
      <ul>
        {patient.phoneNumbers.map((tel, index) => (
          <li key={index}>{tel}</li>
        ))}
      </ul>
      <label>Correos eletronicos</label>
      <ul>
        {patient.emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      <button className="btn-login" onClick={handleOpenEdit}>
        Editar
      </button>
      <button className="btn-delete" onClick={handleDelete}>
        Eliminar
      </button>
      <label className="lb-error">{error}</label>
    </div>
  );
}

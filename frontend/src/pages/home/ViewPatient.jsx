import { useLocation, useNavigate } from "react-router-dom";
import {
  requstDeletePatinet,
  requstUpdatePatinetSymptom,
  resetStatusPatient,
} from "../../redux/patient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useSymptomHook from "../../hooks/symptomHook";
import ItemSymptom from "./componets/itemSymptom";

export default function ViewPatient() {
  const location = useLocation();
  const patient = location.state ? location.state.patient : {};
  const navigate = useNavigate();
  const dispach = useDispatch();
  const status = useSelector((state) => state.patinets.status);
  const [error, setError] = useState("");
  const { loading, symptoms, getSymptoms } = useSymptomHook();

  useEffect(() => {
    console.log(status);

    if (status === "succeeded") {
      dispach(resetStatusPatient());
      navigate("/home");
    }

    if (status === "idle") {
      getSymptoms();
    }

    if (status === "failed") {
      setError("No se pudo eliminar, intente mas tarde");
    }
  }, [status]);

  const handleOpenEdit = () => {
    dispach(resetStatusPatient());
    navigate("/patient/edit", {
      state: { patient: patient },
    });
  };

  const handleDelete = () => {
    dispach(requstDeletePatinet(patient._id));
  };

  const handleSymptom = (e) => {
    const idSymptom = e.target.value;
    const symptomSelect = symptoms.filter((sim) => sim._id === idSymptom);
    const symtoRe = {
      name: symptomSelect[0].name,
      description: symptomSelect[0].description,
    };

    dispach(
      requstUpdatePatinetSymptom(
        patient._id,
        {
          idSymptom,
          idPatient: patient._id,
        },
        symtoRe
      )
    );
  };

  const handleChangeSym = () => {
    navigate("/symptom/create");
  };
  return (
    <div className="ct-general-view">
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
      <div className="ct-symptom-patient">
        <h3>Sistomas</h3>
        {patient.symptoms.map((sym, index) => (
          <ItemSymptom key={index} name={sym.name} />
        ))}
      </div>
      <div className="ct-symptom">
        <h3>Seleciona sintoma a añadir</h3>
        <select onChange={handleSymptom}>
          {symptoms.map((sym, index) => (
            <option key={index} value={sym._id}>
              {sym.name}
            </option>
          ))}
        </select>
        <button className="btn-add" onClick={handleChangeSym}>
          Crear Symptom
        </button>
      </div>
    </div>
  );
}

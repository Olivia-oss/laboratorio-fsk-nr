import { useSelector } from "react-redux";
import ItemPatient from "./componets/ItemPatient";
import "./styles/home.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  const patients = useSelector((state) => state.patinets.data);

  const handleOpen = () => {
    navigate("/createPatient");
  };

  const handleView = (patient) => {
    navigate("/patient/view", {
      state: { patient: patient },
    });
  };

  return (
    <div>
      <h2>Pacientes</h2>
      <button className="btn-add" onClick={handleOpen}>
        Añadir
      </button>
      {patients.map((patinet, index) => {
        return (
          <div key={index} onClick={() => handleView(patinet)}>
            <ItemPatient
              name={patinet.name}
              lastname={patinet.lastname}
              address={patinet.address}
              birhdate={patinet.birthdate}
            />
          </div>
        );
      })}
    </div>
  );
}

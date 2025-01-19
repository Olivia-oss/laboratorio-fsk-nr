import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requstCreatePatinet, resetStatusPatient } from "../../redux/patient";
import { useNavigate } from "react-router-dom";

export default function CreatePatient() {
  const dispach = useDispatch();
  const status = useSelector((state) => state.patinets.status);
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState({
    list: [],
    count: 1,
  });
  const [error, setError] = useState("");

  const [emails, setEmails] = useState({
    list: [],
    count: 1,
  });

  useEffect(() => {
    if (status === "succeeded") {
      dispach(resetStatusPatient());
      navigate("/home");
    }
    if (status === "failed") {
      setError("Intente mas tarde");
    }
  }, [dispach, navigate, status]);

  const handleMoreNumber = () => {
    setNumbers({
      ...numbers,
      count: numbers.count + 1,
    });
  };

  const handleMoreEmail = () => {
    setEmails({
      ...emails,
      count: emails.count + 1,
    });
  };

  const handleInputNumberChange = (index, value) => {
    const updatedList = [...numbers.list];
    updatedList[index] = value;
    setNumbers((prevState) => ({
      ...prevState,
      list: updatedList,
    }));
  };

  const handleInputEmailChange = (index, value) => {
    const updatedList = [...emails.list];
    updatedList[index] = value;
    setEmails((prevState) => ({
      ...prevState,
      list: updatedList,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (numbers.list.length === 0) {
      setError("Ingresa un numero");
      return;
    }
    if (emails.list.length === 0) {
      setError("Ingresa un correo");
      return;
    }
    setError("");

    const name = document.getElementById("create-name").value;
    const lastname = document.getElementById("create-lastname").value;
    const address = document.getElementById("create-address").value;
    const birthdate = document.getElementById("create-birthday").value;

    dispach(
      requstCreatePatinet({
        name,
        lastname,
        address,
        birthdate,
        phoneNumbers: numbers.list,
        emails: emails.list,
      })
    );
  };

  return (
    <form className="ct-form-patient" onSubmit={handleSave}>
      <h3>Añadir paciente</h3>
      <label>Nombre</label>
      <input placeholder="Añade un nombre" id="create-name" required />
      <label>Apellidos</label>
      <input placeholder="Añade un apellidos" id="create-lastname" required />

      <label>Direccion</label>
      <input placeholder="Añade un direccion" id="create-address" required />
      <label>Fecha de nacimiento</label>
      <input type="date" required id="create-birthday" />
      <label>Telefonos</label>
      {Array.from({ length: numbers.count }).map((num, index) => {
        return (
          <input
            key={index}
            type="number"
            placeholder="Añade un correo telefono"
            value={numbers.list[index] || ""}
            onChange={(e) => handleInputNumberChange(index, e.target.value)}
          />
        );
      })}
      <button className="btn-more" onClick={handleMoreNumber}>
        +
      </button>
      <label>Correos eletronicos</label>
      {Array.from({ length: emails.count }).map((num, index) => {
        return (
          <input
            key={index}
            type="email"
            placeholder="Añade un corre eletronico"
            value={emails.list[index] || ""}
            onChange={(e) => handleInputEmailChange(index, e.target.value)}
          />
        );
      })}
      <button className="btn-more" onClick={handleMoreEmail}>
        +
      </button>
      <label className="lb-error">{error}</label>

      <button className="btn-add">Guardar</button>
    </form>
  );
}

import { useState } from "react";

import "./styles/symptom.css";
import { SymptomRequest } from "../../api/request/symptom";
import { useNavigate } from "react-router-dom";

export default function CreateSymptom() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const save = await SymptomRequest.postSymptom(form);

    if (save) {
      setMessage("Guardado");
      setForm({
        name: "",
        description: "",
      });
    } else {
      setMessage("Ocurrio un erro intente mas tarde");
    }
    setLoading(false);
  };

  const handleMain = () => {
    navigate("/home");
  };
  return (
    <form className="ct-form-symptom" onSubmit={handleSave}>
      <button className="btn-signIn" onClick={handleMain}>
        Principal
      </button>
      <h3>Añadir paciente</h3>
      <label>Nombre</label>
      <input
        placeholder="Añade un nombre"
        id="create-name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <label>Description</label>
      <input
        placeholder="Añade una description"
        id="create-name"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <label>{message}</label>
      <button className="btn-add">Guardar</button>
    </form>
  );
}

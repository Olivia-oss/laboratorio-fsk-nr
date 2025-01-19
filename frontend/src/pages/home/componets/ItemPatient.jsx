import PropTypes from "prop-types";
import { trasformDate } from "../../../utils/transform";
export default function ItemPatient({ name, lastname, address, birhdate }) {
  return (
    <div className="ct-item-patient">
      <p className="p-name">
        {name} {lastname}
      </p>
      <p>
        <span>Direccion:</span> {address}
      </p>
      <p>
        <span>Fecha de nacimiento:</span> {trasformDate(birhdate)}
      </p>
    </div>
  );
}

ItemPatient.propTypes = {
  name: PropTypes.string,
  lastname: PropTypes.string,
  address: PropTypes.string,
  birhdate: PropTypes.string,
};

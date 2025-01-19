import PropTypes from "prop-types";
export default function ItemSymptom({ name }) {
  return <div className="item-symptom">{name}</div>;
}

ItemSymptom.propTypes = {
  name: PropTypes.string,
};

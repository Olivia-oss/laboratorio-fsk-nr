import PropTypes from "prop-types";
function LoadingIcon({ width, height }) {
  return <div className="loading-spinner" style={{ width, height }}></div>;
}

LoadingIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default LoadingIcon;

import PropTypes from "prop-types";
import style from "./Button.module.css";

export default function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={style.Button}>
      Load more
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

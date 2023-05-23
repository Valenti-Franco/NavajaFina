import style from "../index.module.css";

const BurguerIcons = (props) => {
  return (
        <div
      onClick={props.handleClick}
      className={`${style.navicon} ${props.clicked ? style.open : ""}`}
    >
  
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurguerIcons;

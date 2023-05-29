import style from "../index.module.css";

const BurguerIcons = (props) => {
  return (
        <div
      onClick={props.handleClick}
      className={`${style.navicon} ${props.clicked ? style.open : ""}`}
    >
  
  
    </div>
  );
};

export default BurguerIcons;

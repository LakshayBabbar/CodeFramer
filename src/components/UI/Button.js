import styles from "./button.module.css";

function Button({ children, style, type }) {
  type !== null ? type="text": console.log(type);
  return (
    <button
      className={styles.btn}
      style={style}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;

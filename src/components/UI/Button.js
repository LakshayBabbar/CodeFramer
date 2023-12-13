import styles from "./button.module.css";
import { motion, spring } from "framer-motion";

function Button({ children, style, type }) {
  type !== null ? type="text": console.log(type);
  return (
    <motion.button
      className={styles.btn}
      style={style}
      type={type}
      whileHover={{
        scale: 1.1,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      {children}
    </motion.button>
  );
}

export default Button;

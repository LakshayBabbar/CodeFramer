import styles from "./button.module.css";
import { motion, spring } from "framer-motion";

function Button({ children, style }) {
  return (
    <motion.button
      className={styles.btn}
      style={style}
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

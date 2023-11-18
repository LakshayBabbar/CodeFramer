import { motion } from "framer-motion";
import styles from './styles.module.css';

function index() {
  return (
    <motion.div
      initial={{ x: 100 }}
      whileInView={{ x: 0 }}
      transition={{ x: { type: "spring", stiffness: 200 } }}
      className={styles.wrapper}
    >
      <h1>Feedback</h1>
    </motion.div>
  );
}

export default index;

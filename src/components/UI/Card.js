import styles from "./card.module.css";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { motion } from "framer-motion";

function Card(props) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ y: "15vh", opacity: 0 ,skewY: "-2deg"}}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.03, skewY: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
    >
      {props.img}
      <h2>{props.title}</h2>
      <h3>{props.desc}</h3>
      <Button>
        <Link href={props.link} className={styles.link}>
          {props.linkT}
        </Link>
      </Button>
    </motion.div>
  );
}

export default Card;

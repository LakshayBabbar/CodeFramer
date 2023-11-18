import styles from "./card.module.css";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { motion } from "framer-motion";

function Card(props) {
  return (
    <motion.div className={styles.wrapper} initial={{y: "15vh"}} whileInView={{y: 0}}>
      {props.img}
      <h1>{props.title}</h1>
      <h3>{props.desc}</h3>
      <Button>
        <Link href={props.link} className={styles.link}>{props.linkT}</Link>
      </Button>
    </motion.div>
  );
}

export default Card;

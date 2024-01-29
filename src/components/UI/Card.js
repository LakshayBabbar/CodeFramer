"use client";
import styles from "./card.module.css";
import Link from "next/link";
import Button from "@/components/UI/Button";

function Card(props) {
  return (
    <div className={styles.wrapper}>
      {props.img}
      <h2>{props.title}</h2>
      <p className={styles.desc}>{props.desc}</p>
      <Button>
        <Link href={props.link} className={styles.link}>
          {props.linkT}
        </Link>
      </Button>
    </div>
  );
}

export default Card;

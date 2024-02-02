import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.outer}>
        <div className={styles.inner} />
      </div>
      <h1>Loading...Please Wait</h1>
    </div>
  );
};

export default Loading;

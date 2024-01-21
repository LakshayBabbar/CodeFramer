import styles from "./styles.module.css";

const index = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.fallback}>
        We apologize, but it appears that the SignIn/SignUp functionality is
        currently incomplete. Please try again at a later time.
      </h2>
    </div>
  );
};

export default index;

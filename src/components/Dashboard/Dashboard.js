import styles from "./styles.module.css";

const Dashboard = ({ username }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.name}>Welcome, {username}</h1>
        <h2 className={styles.fallback}>
          We apologize, but it appears that the SignIn/SignUp functionality is
          currently incomplete. Please try again at a later time.
        </h2>
      </div>
    </>
  );
};
export default Dashboard;

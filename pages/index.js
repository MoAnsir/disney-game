import Header from "../components/Header";
import Stage from "../components/Stage";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    // <div className={styles.container}>
    <div className="container mx-auto">
      <Header />
      <Stage />
    </div>
  );
}

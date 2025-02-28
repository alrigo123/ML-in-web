import styles from "./page.module.css";
import PrediccionPage from './pages/prediction';

export default function Home() {
  return (
    <div className={styles.page}>
      <PrediccionPage />
    </div>
  );
}

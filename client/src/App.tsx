import styles from './styles/App.module.css';

export const App = () => {
  return (
    <div className={styles['app-container']}>
      <header className={styles['app-header']}>
        <h1>Url Shortener</h1>
        <p>
          A simple and efficient tool to shorten your long URLs for easy sharing
          and tracking.
        </p>
      </header>
    </div>
  );
};

import { FC } from 'react';
import styles from './Loader.module.css';

const Loader: FC = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loader-container">
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  );
};

export default Loader;

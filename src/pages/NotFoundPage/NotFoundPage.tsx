import { FC } from 'react';
import styles from './NotFoundPage.module.css';

const NotFoundPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;

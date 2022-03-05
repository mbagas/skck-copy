import React from 'react';
import styles from '../../styles/Home.module.css';

const MainLayout: React.FC = ({ children }) => {
  return <div className={styles.bg_all}>{children}</div>;
};

export default MainLayout;

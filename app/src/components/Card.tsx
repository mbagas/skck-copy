import React from 'react';
import styles from '../../styles/Home.module.css';

type Props = {
  link: string;
  title: string;
  content: string;
};

const Card: React.FC<Props> = ({ link, title, content }) => {
  return (
    <a href={link} className={styles.card}>
      <h2>{title}</h2>
      <p>{content}</p>
    </a>
  );
};

export default Card;

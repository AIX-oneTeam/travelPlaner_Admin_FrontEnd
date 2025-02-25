import React from 'react';
import { Chart } from '../chart/Chart';
import styles from './Card.module.scss'

interface CardProps {
  agentName: string;
  title: string;
}

export const Card: React.FC<CardProps> = ({ agentName, title }) => {
  return (
    <div className={styles.chartcard_container}>
      <div className={styles.chart_container}>
        <div className={styles.chart_content}>
          <Chart agentName={agentName} />
        </div>
      </div>
      <div className={styles.chartcard_title_container}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

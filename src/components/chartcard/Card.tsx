import React from 'react';
import { MemberChart } from '../memberchart/MemberChart';
import { AgentChart } from '../chart/Chart';
import styles from './Card.module.scss'

interface CardProps {
  type: 'member' | 'agent';
  agentName?: string;
  title: string;
}

export const Card: React.FC<CardProps> = ({ type, agentName, title }) => {
  return (
    <div className={styles.chartcard_container}>
      <div className={styles.chart_container}>
        <div className={styles.chart_content}>
          {type === 'member' ? <MemberChart /> : <AgentChart agentName={agentName!} />}
        </div>
      </div>
      <div className={styles.chartcard_title_container}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

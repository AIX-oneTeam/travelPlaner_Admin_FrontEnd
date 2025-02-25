import React from 'react'
import { useRecoilValue } from 'recoil';
import { chartDataState } from '../../recoil/atoms';
import { Card } from '../../components/chartcard/Card'
import { useChartData } from '../../hooks/useChartData';
import styles from './Agent.module.scss'

function Agent() {
  useChartData(); // This hook will fetch the data when the component mounts
  const chartData = useRecoilValue(chartDataState);

  const uniqueAgents = Array.from(new Set(chartData.map(item => item.agent_name)));

  const agentTitles: { [key: string]: string } = {
    create_plan: 'Plan',
    create_recommendation_accommodation: 'Accommodation',
    create_recommendation_cafe: 'Cafe',
    create_recommendation_restaurant: 'Restaurant',
    create_tourist_plan: 'Tourist Plan',
  };

  return (
    <div className={styles.agent_container}>
      <div className={styles.agent_content_container}>
        <div className={styles.agent_title_container}>
          <h2 className={styles.agent_title}>Agent</h2>
        </div>
        <div className={styles.agent_main_content_container}>
        {uniqueAgents.map(agent => (
  <Card key={agent} type="agent" agentName={agent} title={agentTitles[agent] || agent} />
))}
        </div>
      </div>
    </div>
  )
}

export default Agent

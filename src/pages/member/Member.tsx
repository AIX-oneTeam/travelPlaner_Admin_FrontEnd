import React from 'react'
import styles from './Member.module.css'
import Graph from '../../components/graph/Graph'

function Member() {
  // 예시 데이터 (실제 사용 시 이 부분을 API 호출 등으로 대체해야 합니다)
  const memberSignupData = [
    { x: '2025-02-01', y: 10 },
    { x: '2025-02-08', y: 15 },
    { x: '2025-02-15', y: 20 },
    { x: '2025-02-22', y: 25 },
  ];

  return (
    <div className={styles.member_container}>
      <div className={styles.member_title_container}>
        <h2 className={styles.member_title}>Member</h2>
      </div>
      <div className={styles.member_content_container}>
        <div className={styles.member_content}>
          <Graph data={memberSignupData} />
        </div>
      </div>
    </div>
  )
}

export default Member

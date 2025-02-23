import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  padding: 20px;
  background: white;
`;

// 새로 추가된 인터페이스
interface MemberSignupChartProps {
  data: { x: string; y: number }[];
}

// 컴포넌트 타입 지정
const Graph: React.FC<MemberSignupChartProps> = ({ data }) => (
  <Card>
    <h2>멤버 가입 추이</h2>
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={[
          {
            id: '멤버 가입',
            data: data
          }
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        axisBottom={{
          format: '%m/%d',
          tickValues: 'every 7 days',
          legend: '날짜',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickValues: 5,
          legend: '가입자 수',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true}
        enableSlices="x"
      />
    </div>
  </Card>
);

export default Graph;

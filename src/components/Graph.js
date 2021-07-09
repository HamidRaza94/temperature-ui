import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = ({ graphData = [] }) => {
  const labelsArray = [];

  graphData.forEach(({ ts }, index) => {
    if (index % 50000 === 0) {
      labelsArray.push(ts);
    }
  });

  return (
    <div style={{ height: '50%', width: '50%' }}>
      <Line
        data={{
          labels: labelsArray,
          datasets: [
            {
              label: 'current values',
              data: graphData,
              parsing: {
                yAxisKey: 'val',
              },
              borderWidth: 1,
            },
          ],
        }}
        options={{
          parsing: {
            xAxisKey: 'ts',
            yAxisKey: 'val',
          },
        }}
      />
    </div>
  );
};

export default Graph;

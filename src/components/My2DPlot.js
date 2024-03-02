import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the Plot component with SSR disabled
const DynamicPlot = dynamic(
  () => import('react-plotly.js').then((mod) => mod.default),
  { ssr: false }
);
const My2DPlot = ({ data,testData,predictionData }) => {
  // Process actual data
  const dates = data.map(item => new Date(item.publication_date));
  const citationCounts = data.map(item => item.citation_count);

  // Process test data
  const testDates = testData.map(item => new Date(item.publication_date));
  const testCitationCounts = testData.map(item => item.citation_count);

  // Process prediction data
  const predictionDates = predictionData.map(item => new Date(item.publication_date));
  const predictionCitationCounts = predictionData.map(item => item.citation_count);

  return (
    <DynamicPlot
      data={[
        {
          x: dates,
          y: citationCounts,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Actual Data',
          marker: { color: 'blue' },
        },
        {
          x: testDates,
          y: testCitationCounts,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Test Data',
          marker: { color: 'green' },
        },
        {
          x: predictionDates,
          y: predictionCitationCounts,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Forecast',
          marker: { color: 'red' },
        },
      ]}
      layout={{
        width: 920,
        height: 480,
        title: 'Citation Count Over Time',
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        font: {
          color: 'white',
        },
        xaxis: {
          title: 'Publication Date',
          color: 'white',
        },
        yaxis: {
          title: 'Citation Count',
          color: 'white',
        },
        legend: {
          orientation: 'h',
          xanchor: 'center',
          x: 0.5,
          y: -0.2,
          font: {
            size: 12,
            color: 'white',
          },
        },
      }}
    />
  );
};

export default My2DPlot;
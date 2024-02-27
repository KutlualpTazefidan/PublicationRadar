import React, { useState, useLayoutEffect } from 'react';
import Plot from 'react-plotly.js';

const My3DScatterPlot = ({ data }) => {
  const [layout, setLayout] = useState({
    autosize: true,
    title: {
      text: '3D Scatter Plot of Publication Embeddings',
      font: {
        color: 'white', // Set title color to white
      },
    },
    paper_bgcolor: 'black', // Set the background color outside the plot
    plot_bgcolor: 'black', // Set the background color of the plot area
    scene: {
      xaxis: {
        title: 'X Vector',
        color: 'white', // Set x-axis title and tick color to white
        range: [-15, 15], // Fix x-axis range
      },
      yaxis: {
        title: 'Y Vector',
        color: 'white', // Set y-axis title and tick color to white
        range: [-15, 15], // Fix y-axis range
      },
      zaxis: {
        title: 'Z Vector',
        color: 'white', // Set z-axis title and tick color to white
        range: [-15, 15], // Fix z-axis range
      },
      bgcolor: 'black', // Set the 3D scene background color to black
    },
    legend: {
      orientation: "v", // Set legend to vertical
      x: 1.2, // Position the legend to the right of the plot
      xanchor: 'left', // Anchor legend's left to the specified x position
      y: 0.5, // Position legend at the center along the y-axis
      yanchor: 'middle', // Anchor legend's middle to the specified y position
      font: {
        color: 'white', // Set legend text color to white
        size: 15, // Consider reducing the font size
      },
      bgcolor: 'black', // Optional: Set legend background color to match plot
      bordercolor: 'white', // Optional: Set legend border color
      itemwidth: 50, // Adjust the item width if necessary
    },
  });

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform data and group by 'topic_list'
  const groupedData = data.reduce((acc, pub) => {
    if (!acc[pub.topic_list]) {
      acc[pub.topic_list] = {
        x: [],
        y: [],
        z: [],
        type: 'scatter3d',
        mode: 'markers',
        name: pub.topic_list,
        marker: {
          size: 6,
          line: {
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.14)`,
            width: 0.5
          },
          opacity: 0.8
        },
      };
    }
    acc[pub.topic_list].x.push(pub.x_vector);
    acc[pub.topic_list].y.push(pub.y_vector);
    acc[pub.topic_list].z.push(pub.z_vector);
    return acc;
  }, {});

  const plotData = Object.values(groupedData);

  return (
    <Plot
      data={plotData}
      layout={{ ...layout, width: dimensions.width * 1, height: dimensions.height * 0.8 }}
      useResizeHandler={true}
      style={{ width: "100%", height: "80%" }}
    />
  );
};

export default My3DScatterPlot;

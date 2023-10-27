import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { PDFExport } from '@progress/kendo-react-pdf';


const data = {
  labels: ['Red', 'Orange', 'Blue'],
  datasets: [
    {
      label: 'Popularity of colours',
      data: [55, 23, 96],
      backgroundColor: [
        'rgba(255, 0, 0, 0.6)',
        'rgba(255, 165, 0, 0.6)',
        'rgba(0, 0, 255, 0.6)'
      ],
      borderWidth: 1,
    }
  ]
};

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}

function ChartReport({ chartData, pdfExportComponent }) {
  return (
    <PDFExport ref={pdfExportComponent} paperSize="A4">
      <div>
        <PieChart chartData={chartData} />
        <div  >
          <h2>Pie Chart</h2>
          <p>The pie chart below illustrates the distribution of users gained between 2016 and 2020. Each slice of the pie represents a specific year, and the size of the slice corresponds to the number of users gained in that year.</p>
        </div>
      </div>
    </PDFExport>
  )
}

function App() {


  const Data = [
    { year: 2016, userGain: 100 },
    { year: 2017, userGain: 150 },
    { year: 2018, userGain: 200 },
    // Add more data points as needed
  ];

  const chartData = {
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(236, 240, 241, 1)',
          'rgba(80, 175, 149, 1)',
          'rgba(243, 186, 47, 1)',
          'rgba(42, 113, 208, 1)'
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Cubic interpolation mode'
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          },
          suggestedMin: -10,
          suggestedMax: 200
        }
      }
    },
  };

  const pdfExportComponent = React.useRef();

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <div className="App">
      <button onClick={() => exportPDFWithComponent()}>Download PDF</button>
      <ChartReport chartData={chartData} pdfExportComponent={pdfExportComponent} />
    </div>
  );
}

export default App;


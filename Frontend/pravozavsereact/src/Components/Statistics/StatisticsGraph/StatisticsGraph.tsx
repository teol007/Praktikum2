import React, { useState } from "react";
import { Chart } from 'primereact/chart';

interface StatisticsGraphProps {
    dataLabels: string[],
    dataColors: string[],
    data: number[],
    graphLabel: string

}

export default function StatisticsGraph(props: StatisticsGraphProps): JSX.Element {
    const data = {
        labels: props.dataLabels,
        datasets: [
            {
                label: props.graphLabel,
                data: props.data,
                backgroundColor: props.dataColors,
                borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

  return (
    <div className="container"> <br />
        <div className="card">
        <br />
            <Chart type="bar" data={data} options={options} />
        </div>
    </div>
  );
}
import { ChartType } from "@/types/common";

export const getChartConfig = (
  chartType: ChartType,
  width: number,
  height: number
) => {
  const chartConfig = {
    title: chartType === "line" ? "Line Chart" : "Area Chart",
    width: width,
    height: height,
    scales: {
      x: { time: true },
      y: {},
    },
    series: [
      {},
      {
        label: "Value",
        stroke: "#0067b9",
        ...(chartType === "area" ? { fill: "rgb(0,103,185,0.3)" } : {}),
      },
    ],
  };
  return chartConfig;
};

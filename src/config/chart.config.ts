import { RefObject } from "react";

export const getChartConfig = (
  chartType: "line" | "area",
  ref: RefObject<HTMLDivElement | null>,
  width: number,
  height: number
) => {
  const chartConfig = {
    title: chartType === "line" ? "Line Chart" : "Area Chart",
    width: ref?.current?.clientWidth || width,
    height: height,
    scales: {
      x: { time: true },
      y: {},
    },
    series: [
      {},
      {
        label: "Value",
        stroke: chartType === "line" ? "#0067b9" : "green",
        ...(chartType === "area" ? { fill: "rgba(0,255,0,0.3)" } : {}),
      },
    ],
  };

  return chartConfig;
};

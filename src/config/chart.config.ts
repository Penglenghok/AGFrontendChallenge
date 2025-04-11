import { ChartType } from "@/types/common";
import { RefObject } from "react";

export const getChartConfig = (
  chartType: ChartType,
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
        stroke: "#0067b9",
        ...(chartType === "area" ? { fill: "rgb(0,103,185,0.3)" } : {}),
      },
    ],
  };
  return chartConfig;
};

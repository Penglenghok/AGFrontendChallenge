// UPlotChart.tsx
import { getChartConfig } from "@/config/chart.config";
import React, { memo, useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import "./Chart.styles.less";
import { ChartType } from "@/types/common";

export interface ChartProps {
  data: [number[], number[]];
  chartType: ChartType;
  width?: number;
  height?: number;
}

function Chart({
  data,
  chartType,
  width = 600,
  height = 300,
}: ChartProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uplotInstanceRef = useRef<uPlot | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const options: uPlot.Options = getChartConfig(
      chartType,
      containerRef,
      width,
      height
    );
    uplotInstanceRef.current = new uPlot(options, data, containerRef.current);
    return () => {
      if (uplotInstanceRef.current) {
        uplotInstanceRef.current.destroy();
        uplotInstanceRef.current = null;
      }
    };
  }, [chartType]);

  // Update chart when data prop changes.
  useEffect(() => {
    if (uplotInstanceRef.current) {
      uplotInstanceRef.current.setData(data);
    }
  }, [data]);

  return <div ref={containerRef} style={{ width: "100%", height: height }} />;
}

export default  memo(Chart);

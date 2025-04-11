// UPlotChart.tsx
import { getChartConfig } from "@/config/chart.config";
import React, { memo, useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import "./Chart.styles.less";
import { ChartType } from "@/types/common";

export interface ChartProps {
  data: [number[], number[]];
  chartType: ChartType;
}

function Chart({ data, chartType }: ChartProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uplotInstanceRef = useRef<uPlot | null>(null);

  const [width, setWidth] = useState(0);
  const height = 300;

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    }

    // Measure on mount
    handleResize();

    // Listen for browser resize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || width === 0) return;
    const options: uPlot.Options = getChartConfig(chartType, width, height);
    uplotInstanceRef.current = new uPlot(options, data, containerRef.current);
    return () => {
      if (uplotInstanceRef.current) {
        uplotInstanceRef.current.destroy();
        uplotInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType, width]);

  // Update chart when data prop changes.
  useEffect(() => {
    if (uplotInstanceRef.current) {
      uplotInstanceRef.current.setData(data);
    }
  }, [data]);

  return <div ref={containerRef} style={{ width: "100%", height: height }} />;
}

export default memo(Chart);

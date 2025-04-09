import React, { useEffect, useRef, useState } from "react";
import { subSeconds } from "date-fns";
import { Select, Typography, Row, Col } from "antd";
import Chart from "../Chart";
import "./Producer.styles.less";
import { CHART_TYPES, TIMEFRAMES, TIMEFRAMES_OPTIONS } from "@/constant/common";
import StatsDisplay from "../Stats";

const { Text } = Typography;

interface DataPoint {
  timestamp: string;
  value: number;
}

interface Stats {
  min: number | null;
  max: number | null;
  avg: string | null;
}

type ChartType = "line" | "area";

interface ProducerUPlotChartContainerProps {
  producerId: string;
}

function Producer({
  producerId,
}: ProducerUPlotChartContainerProps): React.ReactElement {
  // Local state for timeframe, chart type, chart data, and stats.
  const [timeframe, setTimeframe] = useState<"10s" | "30s" | "1m">("10s");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [chartData, setChartData] = useState<[number[], number[]]>([[], []]);
  const [stats, setStats] = useState<Stats>({
    min: null,
    max: null,
    avg: null,
  });

  // Refs to store incoming data.
  const dataStoreRef = useRef<DataPoint[]>([]);

  // Setup the WebSocket connection.
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/producer/${producerId}`);
    ws.onopen = () => {
      console.log("WebSocket connected for producer", producerId);
    };
    ws.onmessage = (event) => {
      try {
        const received: DataPoint[] = JSON.parse(event.data);
        dataStoreRef.current.push(...received);
      } catch (err) {
        console.error("Invalid WebSocket message:", err);
      }
    };
    return () => {
      ws.close();
    };
  }, [producerId]);

  // Filter data based on the selected timeframe.
  const filterDataByTimeframe = (): DataPoint[] => {
    const now = new Date();
    const cutoff = subSeconds(now, TIMEFRAMES[timeframe]);
    const filtered = dataStoreRef.current.filter(
      (dp) => new Date(dp.timestamp) > cutoff
    );
    dataStoreRef.current = filtered;
    return filtered;
  };

  // Compute statistics on the current data.
  const computeStats = (dataPoints: DataPoint[]): Stats => {
    if (dataPoints.length === 0) {
      return { min: null, max: null, avg: null };
    }
    const values = dataPoints.map((dp) => dp.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = (
      values.reduce((sum, val) => sum + val, 0) / values.length
    ).toFixed(2);
    return { min, max, avg };
  };

  // Convert data points into the format [x, y] arrays for chart.
  const convertDataForChart = (
    dataPoints: DataPoint[]
  ): [number[], number[]] => {
    // Converrt xaxis data to from timestamp to seconds.
    const xValues = dataPoints.map(
      (dp) => new Date(dp.timestamp).getTime() / 1000
    );
    const yValues = dataPoints.map((dp) => dp.value);
    return [xValues, yValues];
  };

  //Update data base on interval.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const filteredData = filterDataByTimeframe();
      const newStats = computeStats(filteredData);
      const newChartData = convertDataForChart(filteredData);
      setStats(newStats);
      setChartData(newChartData);
    }, 0);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeframe]);

  return (
    <div className="producer-chart-container">
      <p className="title">Producer #{producerId}</p>
      <Row justify="space-between" align="middle" className="options-container">
        <Col>
          <Text strong>Timeframe: </Text>
          <Select
            defaultValue={timeframe}
            style={{ width: 120, marginRight: "1rem" }}
            onChange={(value) => setTimeframe(value)}
            options={TIMEFRAMES_OPTIONS}
          />
          <Text strong>Type: </Text>
          <Select
            defaultValue={chartType}
            style={{ width: 120 }}
            onChange={(value) => setChartType(value)}
            options={CHART_TYPES}
          />
        </Col>
      </Row>
      <Chart data={chartData} chartType={chartType} width={600} height={300} />
      <div className="height-separator" />
      <StatsDisplay stats={stats} />
    </div>
  );
}

export default Producer;

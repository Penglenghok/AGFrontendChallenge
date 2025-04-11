import React, { useEffect, useRef, useState } from "react";
import { Select, Typography, Row, Col } from "antd";
import Chart from "../Chart/Chart";
import "./Producer.styles.less";
import { CHART_TYPES, TIMEFRAMES_OPTIONS } from "@/constant/chart.options";
import StatsDisplay from "../Stats/Stats";
import { ChartType, DataPoint, Stats, Timeframe } from "@/types/common";
import {
  computeStats,
  convertDataForChart,
  filterDataByTimeframe,
  initializeWebSocket,
} from "@/helper/chart.helper";

const { Text } = Typography;

interface ProducerUPlotChartContainerProps {
  producerId: string;
}

function Producer({
  producerId,
}: ProducerUPlotChartContainerProps): React.ReactElement {
  const [timeframe, setTimeframe] = useState<Timeframe>("10s");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [chartData, setChartData] = useState<[number[], number[]]>([[], []]);
  const [stats, setStats] = useState<Stats>({
    min: null,
    max: null,
    avg: null,
  });

  // Refs to store incoming data.
  const dataStoreRef = useRef<DataPoint[]>([]);

  useEffect(() => {
    const ws = initializeWebSocket(producerId, (message: string) => {
      const received: DataPoint[] = JSON.parse(message);
      dataStoreRef.current.push(...received);
    });
    return () => {
      ws.close();
    };
  }, []);

  //Update data base on interval.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const filteredData = filterDataByTimeframe(dataStoreRef, timeframe);
      const newStats = computeStats(filteredData);
      const newChartData = convertDataForChart(filteredData);
      setStats(newStats);
      setChartData(newChartData);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeframe]);

  return (
    <div className="producer-chart-container" data-testid="producer-item">
      <p className="title">Producer #{producerId}</p>
      <Row className="options-container">
        <Col span={12}>
          <Text strong>Timeframe: </Text>
          <Select
            defaultValue={timeframe}
            onChange={setTimeframe}
            options={TIMEFRAMES_OPTIONS}
          />
        </Col>
        <Col span={12}>
          <Text strong>Type: </Text>
          <Select
            defaultValue={chartType}
            onChange={setChartType}
            options={CHART_TYPES}
          />
        </Col>
      </Row>
      <Chart data={chartData} chartType={chartType} width={600} height={300} />
      <div className="height-separator" />
      <StatsDisplay timeframe={timeframe} stats={stats} />
    </div>
  );
}

export default Producer;

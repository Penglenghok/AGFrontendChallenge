import { DataPoint, Stats, Timeframe } from "@/types/common";
import { RefObject } from "react";
import { subSeconds } from "date-fns";
import { TIMEFRAMES } from "@/constant/chart.options";
import { CONSTANT } from "@/constant";

export function computeStats(dataPoints: DataPoint[]): Stats {
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
}

export function convertDataForChart(
  dataPoints: DataPoint[]
): [number[], number[]] {
  // Converrt xaxis data to from timestamp to seconds.
  const xValues = dataPoints.map(
    (dp) => new Date(dp.timestamp).getTime() / 1000
  );
  const yValues = dataPoints.map((dp) => dp.value);
  return [xValues, yValues];
}

export function filterDataByTimeframe(
  dataStoreRef: RefObject<DataPoint[]>,
  timeframe: Timeframe
): DataPoint[] {
  const now = new Date();
  const cutoff = subSeconds(now, TIMEFRAMES[timeframe]);
  const filtered = dataStoreRef.current.filter(
    (dp) => new Date(dp.timestamp) > cutoff
  );
  dataStoreRef.current = filtered;
  return filtered;
}

export function initializeWebSocket(
  producerId: string,
  messageCallback: (data: string) => void
): WebSocket {
  const socketUrl = `${CONSTANT.ENV_SOCKET_URL}/producer/${producerId}`;
  const ws = new WebSocket(socketUrl);
  ws.onopen = () => {
    console.log("WebSocket connected for producer", producerId);
  };
  ws.onmessage = (event) => {
    try {
      messageCallback(event.data);
    } catch (err) {
      console.error("Invalid WebSocket message:", err);
    }
  };
  return ws;
}

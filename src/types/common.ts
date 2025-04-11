export type ChartType = "line" | "area";
export type Timeframe = "5s" | "10s" | "30s" | "1m";

export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface Stats {
  min: number | null;
  max: number | null;
  avg: string | null;
}

export interface Producer {
  producerId: string;
}

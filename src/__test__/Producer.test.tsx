import { render, screen } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import Producer from "@/components/Producer/Producer";
import {
  computeStats,
  convertDataForChart,
  filterDataByTimeframe,
} from "@/helper/chart.helper";
import { DataPoint } from "@/types/common";
import { RefObject } from "react";
import mockData from "@/mock/times-series-data.json";

describe("Producer Component", () => {
  test("renders correctly with a given producerId", () => {
    const testProducerId = "1";

    render(<Producer producerId={testProducerId} />);

    const containerEl = screen.getByTestId("producer-item");
    expect(containerEl).toBeInTheDocument();

    const titleEl = screen.getByText(`Producer #${testProducerId}`);
    expect(titleEl).toBeInTheDocument();

    const selectElements = screen.getAllByRole("combobox");
    expect(selectElements).toHaveLength(2);
  });
});

describe("Chart Helper Functions", () => {
  // --- computeStats Tests ---
  describe("computeStats", () => {
    it("should compute the correct statistics for the mock data", () => {
      const values = mockData.map((dp) => dp.value);
      const expectedMin = Math.min(...values);
      const expectedMax = Math.max(...values);
      const expectedAvg = (
        values.reduce((acc, v) => acc + v, 0) / values.length
      ).toFixed(2);

      const { min, max, avg } = computeStats(mockData);
      expect(min).toBe(expectedMin);
      expect(max).toBe(expectedMax);
      expect(avg).toBe(expectedAvg);
    });
  });

  // --- convertDataForChart Tests ---
  describe("convertDataForChart", () => {
    it("should convert timestamps to seconds and map values correctly", () => {
      const [xValues, yValues] = convertDataForChart(mockData);
      expect(xValues.length).toBe(mockData.length);
      expect(yValues.length).toBe(mockData.length);

      const firstDataPoint = mockData[0];
      const expectedX = new Date(firstDataPoint.timestamp).getTime() / 1000;
      expect(xValues[0]).toBeCloseTo(expectedX, 5);
      expect(yValues[0]).toBe(firstDataPoint.value);
    });
  });

  // --- filterDataByTimeframe Tests ---
  describe("filterDataByTimeframe", () => {
    it("should filter out data older than the cutoff based on the timeframe", () => {
      // Create two data points: one older than the cutoff and one newer.
      const olderPoint = {
        timestamp: new Date("2025-04-09T19:40:00Z").toISOString(),
        value: 10,
      };
      const newerPoint = {
        timestamp: new Date("2025-04-09T19:40:09Z").toISOString(),
        value: 20,
      };
      const fakeRef: RefObject<DataPoint[]> = {
        current: [olderPoint, newerPoint],
      };

      // Set fake timers: define current time as 2025-04-09T19:40:10Z.
      vi.useFakeTimers().setSystemTime(new Date("2025-04-09T19:40:10Z"));

      // With timeframe "5s" (TIMEFRAMES["5s"] equals 5 seconds), cutoff time is 19:40:05Z.
      // Expect only the newerPoint to pass the filter.
      const filtered = filterDataByTimeframe(fakeRef, "5s");
      expect(filtered).toHaveLength(1);
      expect(filtered[0]).toEqual(newerPoint);

      vi.useRealTimers();
    });

    it("should return all data if every data point is within the timeframe", () => {
      const point1 = {
        timestamp: new Date("2025-04-09T19:40:05Z").toISOString(),
        value: 15,
      };
      const point2 = {
        timestamp: new Date("2025-04-09T19:40:08Z").toISOString(),
        value: 25,
      };
      const fakeRef: RefObject<DataPoint[]> = { current: [point1, point2] };

      vi.useFakeTimers().setSystemTime(new Date("2025-04-09T19:40:10Z"));

      // With timeframe "10s" (TIMEFRAMES["10s"] equals 10 seconds), cutoff time is 19:40:00Z.
      // Expect both points to remain.
      const filtered = filterDataByTimeframe(fakeRef, "10s");
      expect(filtered).toHaveLength(2);
      expect(filtered).toEqual([point1, point2]);

      vi.useRealTimers();
    });
  });
});

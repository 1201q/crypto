import React, { useEffect, useRef, MutableRefObject } from "react";
import { createChart, IChartApi } from "lightweight-charts";
import styled from "styled-components";

interface PropsType {
  data: any[];
}

const LineChart: React.FC<PropsType> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = InitChart(chartRef);

    if (chart) {
      setChart(chart, data);

      window.addEventListener("resize", () => {
        resizeChart(chart);
      });
    }

    return () => {
      if (chartRef.current) {
        window.removeEventListener("resize", () => {
          resizeChart(chart);
        });

        chart?.remove();
      }
    };
  }, []);

  const InitChart = (ref: MutableRefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const chart = createChart(ref.current, {
        layout: {
          background: { color: "white" },
        },
        width: ref.current.clientWidth,
        height: 330,
      });
      return chart;
    }
    return null;
  };

  const setChart = (chart: IChartApi, chartData: any[]) => {
    const newSeries = chart.addAreaSeries({
      lineColor: "#3d86f0",
      topColor: "white",
      bottomColor: "white",
    });

    chart.applyOptions({
      rightPriceScale: {
        visible: false,
        scaleMargins: {
          top: 0.05,
          bottom: 0.1,
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      timeScale: {
        visible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    chart.timeScale().fitContent();
    newSeries.setData(chartData);
  };

  const resizeChart = (chart: IChartApi | null) => {
    if (containerRef.current && chart) {
      chart.applyOptions({ width: containerRef.current.clientWidth });
    }
  };

  return (
    <Chart ref={containerRef}>
      <div ref={chartRef} />
    </Chart>
  );
};

const Chart = styled.div`
  width: calc(100vw - 40px);
`;

export default LineChart;

import React, { useEffect, useRef, MutableRefObject, useMemo } from "react";
import { createChart, IChartApi } from "lightweight-charts";
import styled from "styled-components";
import { LineChartPropsType } from "@/types/types";
import { useLineChart } from "@/utils/hooks/useLineChart";
import getBongFetchURL from "@/utils/common/getBongFetchURL";
import { useAtom } from "jotai";
import { queryCodeAtom, selectedLineChartOptionAtom } from "@/context/atoms";

const LineChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const [option] = useAtom(selectedLineChartOptionAtom);
  const [selectCode] = useAtom(queryCodeAtom);

  const URL = useMemo(
    () => getBongFetchURL(option, selectCode),
    [option, selectCode]
  );

  const { data: chartData, isValidating } = useLineChart(URL);

  useEffect(() => {
    if (!isValidating && chartData) {
      console.log(chartData);
      const chart = InitChart(chartRef);

      if (chart) {
        setChart(chart, chartData);

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
    }
  }, [isValidating, chartData]);

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
          bottom: 0.2,
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
    <>
      {!isValidating ? (
        <Chart ref={containerRef}>
          <div ref={chartRef} />
        </Chart>
      ) : (
        <Loading>로딩</Loading>
      )}
    </>
  );
};

const Chart = styled.div`
  width: calc(100vw - 40px);
  max-width: 100%;
`;

const Loading = styled.div`
  height: 330px;
`;
export default LineChart;

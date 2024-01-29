import React, { useEffect, useRef, MutableRefObject, useMemo } from "react";
import {
  ColorType,
  Coordinate,
  createChart,
  IChartApi,
  LineStyle,
  MouseEventParams,
  Time,
} from "lightweight-charts";
import styled from "styled-components";
import { useLineChart } from "@/utils/hooks/useLineChart";
import getBongFetchURL from "@/utils/common/getBongFetchURL";
import { useAtom } from "jotai";
import { queryCodeAtom, selectedLineChartOptionAtom } from "@/context/atoms";
import dayjs from "dayjs";
import f from "@/utils/common/formatting";
import { LineChartPropsType } from "@/types/types";

interface ChartPropsType {
  latestData: LineChartPropsType;
}

const LineChart: React.FC<ChartPropsType> = ({ latestData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSeriesRef = useRef<any>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  const [option] = useAtom(selectedLineChartOptionAtom);
  const [selectCode] = useAtom(queryCodeAtom);

  const URL = useMemo(
    () => getBongFetchURL(option, selectCode),
    [option, selectCode]
  );

  const { data: chartData, isValidating } = useLineChart(URL);
  useEffect(() => {
    if (!isValidating && chartData) {
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

  useEffect(() => {
    if (latestData?.value !== 0 && chartSeriesRef.current) {
      chartSeriesRef.current.update(latestData);
    }
  }, [latestData]);

  const InitChart = (ref: MutableRefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const chart = createChart(ref.current, {
        layout: {
          background: { type: ColorType.Solid, color: "white" },
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
      lastPriceAnimation: 1,
    });

    chart.subscribeCrosshairMove((param) => toolTipControl(param, newSeries));

    chart.applyOptions({
      handleScale: {
        mouseWheel: false,
      },

      rightPriceScale: {
        visible: false,
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          style: LineStyle.Solid,
          width: 1,
          color: "lightgray",
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
    chartSeriesRef.current = newSeries;
  };

  const resizeChart = (chart: IChartApi | null) => {
    if (containerRef.current && chart) {
      chart.applyOptions({ width: containerRef.current.clientWidth });
    }
  };

  const toolTipControl = (param: MouseEventParams<Time>, series: any) => {
    if (toolTipRef.current && chartRef.current) {
      if (param.point === undefined) {
        // 마우스 커서가 차트 위에 없을때
        toolTipRef.current.style.display = "none";
      } else {
        toolTipRef.current.style.display = "block";
        toolTipRef.current.style.position = "absolute";
        const date = param.time;
        const unix = dayjs.unix(Number(date));
        let dateToString = "";

        if (option.type === "minutes") {
          dateToString = unix.add(9, "hour").format("YYYY.MM.DD HH:mm");
        } else {
          dateToString = unix.add(9, "hour").format("YYYY.MM.DD");
        }

        const data = param.seriesData.get(series);

        const price = data && "value" in data ? data.value : "";

        toolTipRef.current.innerHTML = `<div>
        <div>${dateToString}</div>
        <p>${f("price", price || 0)}원</p></div>`;

        const y = param.point.y;
        let left = param.point.x;

        if (left < 30) {
          left = 30 as Coordinate;
          toolTipRef.current.style.textAlign = "left";
        } else if (left > chartRef.current.clientWidth - 30) {
          left = (chartRef.current.clientWidth - 30) as Coordinate;
          toolTipRef.current.style.textAlign = "right";
        } else {
          toolTipRef.current.style.left = left - 35 + "px";
          toolTipRef.current.style.textAlign = "center";
        }
        toolTipRef.current.style.top = 0 + "px";
      }
    }
  };

  return (
    <>
      {!isValidating ? (
        <Chart ref={containerRef}>
          <div ref={chartRef} />
          <ToolTip ref={toolTipRef} />
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
  position: relative;
`;

const Loading = styled.div`
  height: 330px;
`;

const ToolTip = styled.div`
  width: 80px;
  height: 40px;
  z-index: 100;
  text-align: center;
  display: none;
  background-color: white;
  font-size: 11px;
  color: gray;
  font-weight: 500;

  p {
    margin-top: 2px;
    font-size: 13px;
    color: black;
    font-weight: 600;
    letter-spacing: -0.3px;
  }
`;

export default LineChart;

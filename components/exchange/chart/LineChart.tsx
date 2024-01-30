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
import utc from "dayjs/plugin/utc";
import f from "@/utils/common/formatting";
import { LineChartPropsType } from "@/types/types";

dayjs.extend(utc);

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

  let { data: chartData, isValidating } = useLineChart(URL);

  let latestDataTime = chartData && chartData[chartData.length - 1].time;

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
    if (chartData) {
      if (latestData?.value !== 0 && chartSeriesRef.current) {
        chartSeriesRef.current.update(handleUpdateLatestData(chartData));
      }
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
    const volumeData = chartData.map((data) => {
      return { time: data.time, value: data.volume };
    });
    const newSeries = chart.addLineSeries({
      color: getLineColor(chartData),
      lastPriceAnimation: 1,
      baseLineStyle: 1,
      priceLineVisible: false,
      crosshairMarkerVisible: false,
      lineType: 0,
    });
    const volumeSeries = chart.addHistogramSeries({
      color: "#d1d6db",
      priceFormat: { type: "volume" },
      priceLineVisible: false,
      priceScaleId: "",
    });

    chart.subscribeCrosshairMove((param) => toolTipControl(param, newSeries));

    chart.applyOptions({
      handleScale: {
        mouseWheel: false,
      },
      rightPriceScale: {
        visible: false,
        scaleMargins: {
          top: 0.15,
          bottom: 0.25,
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
        shiftVisibleRangeOnNewBar: false,
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

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0.08,
      },
    });

    newSeries.setData(chartData);
    volumeSeries.setData(volumeData);

    chart.timeScale().fitContent();
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
        console.log();
        toolTipRef.current.style.display = "block";
        toolTipRef.current.style.position = "absolute";
        const date = param.time;
        const unix = dayjs.unix(Number(date));
        let isHoverLastData = param.logical === chartData.length - 1;
        let dateToString = "";

        if (isHoverLastData) {
          dateToString = unix.add(9, "hour").format("현재");
        } else {
          if (option.type === "minutes") {
            dateToString = unix.add(9, "hour").format("YYYY.MM.DD HH:mm");
          } else {
            dateToString = unix.add(9, "hour").format("YYYY.MM.DD");
          }
        }

        const data = param.seriesData.get(series);

        const price = data && "value" in data ? data.value : "";

        toolTipRef.current.innerHTML = `<div>
        <div>${dateToString}</div>
        <p>${f("price", price || 0)}</p></div>`;

        let left = param.point.x;

        if (left < 50) {
          left = 50 as Coordinate;
          toolTipRef.current.style.textAlign = "left";
        } else if (left > chartRef.current.clientWidth - 50) {
          left = (chartRef.current.clientWidth - 50) as Coordinate;
          toolTipRef.current.style.textAlign = "right";
        } else {
          toolTipRef.current.style.left = left - 50 + "px";
          toolTipRef.current.style.textAlign = "center";
        }
        toolTipRef.current.style.top = 0 + "px";
      }
    }
  };

  const handleUpdateLatestData = (data: LineChartPropsType[]) => {
    latestData.time = latestDataTime;

    return (
      data && data[data.length - 1] && (data[data.length - 1] = latestData)
    );
  };

  const getLineColor = (data: LineChartPropsType[]) => {
    if (data[0].value > data[data.length - 1].value) {
      return "#448aef";
    } else if (data[0].value < data[data.length - 1].value) {
      return "#df5068";
    } else {
      return "#6b7684";
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
  width: 100px;
  height: 40px;
  z-index: 100;
  text-align: center;
  display: none;
  background-color: white;
  font-size: 12px;
  color: gray;
  font-weight: 500;

  p {
    margin-top: 2px;
    font-size: 16px;
    color: black;
    font-weight: 700;
    letter-spacing: -0px;
  }
`;

export default LineChart;

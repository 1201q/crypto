import React, { useEffect, useRef, MutableRefObject } from "react";
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

import { useAtom } from "jotai";
import { selectedLineChartOptionAtom } from "@/context/atoms";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import f from "@/utils/common/formatting";
import { LineChartPropsType } from "@/types/types";

dayjs.extend(utc);

interface ChartPropsType {
  latestData: LineChartPropsType;
  chartData: LineChartPropsType[];
  isValidating: boolean;
}

const LineChart: React.FC<ChartPropsType> = ({
  latestData,
  chartData,
  isValidating,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSeriesRef = useRef<any>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  const [option] = useAtom(selectedLineChartOptionAtom);

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

        chartSeriesRef.current.applyOptions({
          color: getLineColor(chartData[0].value, latestData.value),
        });
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
        height: 320,
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
      color: getLineColor(
        chartData[0].value,
        chartData[chartData.length - 1].value
      ),
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
        top: 0.85,
        bottom: 0.0,
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
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.y < 0
      ) {
        // 마우스 커서가 차트 위에 없을때
        toolTipRef.current.style.display = "none";
      } else {
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
        const currentPrice =
          chartData[chartData.length - 1] &&
          chartData[chartData.length - 1].value;

        toolTipRef.current.innerHTML = `
        <div>
          <span>${dateToString}</span>
          <p>${f("price", price || 0)}</p>
          <div style="color: ${
            typeof price === "number" && getTextColor(price, currentPrice)
          }">
          ${
            typeof price === "number" &&
            f("change", (price - currentPrice) / price)
          }%</div>
        </div>`;

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

  const getLineColor = (firstData: number, lastData: number) => {
    if (firstData > lastData) {
      return "#448aef";
    } else if (firstData < lastData) {
      return "#df5068";
    } else {
      return "#6b7684";
    }
  };

  const getTextColor = (targetPrice: number, currentPrice: number) => {
    if (targetPrice - currentPrice > 0) {
      return "#df5068";
    } else if (targetPrice - currentPrice < 0) {
      return "#448aef";
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
  min-height: 320px;
`;

const Loading = styled.div`
  height: 320px;
`;

const ToolTip = styled.div`
  width: 100px;
  height: 45px;
  z-index: 100;
  text-align: center;
  display: none;
  background-color: white;
  font-size: 12px;
  font-weight: 600;

  p {
    margin-top: 1px;
    font-size: 16px;
    color: black;
    font-weight: 700;
    letter-spacing: -0px;
    margin-bottom: 2px;
  }

  span {
    font-size: 11px;
    color: gray;
    font-weight: 500;
  }
`;

export default React.memo(LineChart);

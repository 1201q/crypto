import styled from "styled-components";

interface SpinnerType {
  size?: number;
  color?: string;
  width?: number;
}

const LoadingSpinner = ({
  size = 25,
  color = "black",
  width = 5,
}: SpinnerType) => {
  return (
    <Svg viewBox="0 0 50 50" size={size} color={color} width={width}>
      <circle cx="25" cy="25" r="20" fill="none" />
    </Svg>
  );
};

const Svg = styled.svg<SpinnerType>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  animation: rotate 1.5s linear infinite;

  & circle {
    stroke: ${(props) => props.color};
    stroke-linecap: round;
    stroke-width: ${(props) => props.width};
    animation: dash 1.5s ease-in-out infinite;
  }
`;

export default LoadingSpinner;

import { useEffect, useState, useRef } from "react";
import {wheelOptionColors} from "../config"

export interface WheelComponentProps {
  segments: string[];
  segColors: string[];
  winningSegment: string;
  onFinished: (segment: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  fontSize?: string;
  outlineWidth?: number;
  wheelOpacity?: number;
  setDisableClose?: (value: boolean) => void;
}

const wheelColors = {
  wheelFrame: wheelOptionColors.wheelFrame,
  centerCircleBG: wheelOptionColors.centerCircleBG,
};

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "Spin",
  isOnlyOnce = true,
  size = window.innerWidth,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = "proxima-nova",
  fontSize = "1em",
  outlineWidth = 7,
  setDisableClose,
}: WheelComponentProps) => {
  // const [isSpinningSlowly] = useState(true);
  const slowSpinHandle = useRef<number | null>(null);

  //ปรับ idle spin ให้ช้าลง
  // const slowSpin = () => {
  //   angleCurrent += 0.0;
  //   // angleCurrent += 0;
  //   if (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
  //   draw();
  //   slowSpinHandle.current = requestAnimationFrame(slowSpin);
  // };

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);

    // if (isSpinningSlowly) {
    //   slowSpin();
    // }

    return () => {
      if (slowSpinHandle.current) {
        cancelAnimationFrame(slowSpinHandle.current);
      }
    };
  }, []);

  const randomString = () => {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
    const length = 8;
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  };
  const canvasId = useRef(`canvas-${randomString()}`);
  const wheelId = useRef(`wheel-${randomString()}`);
  const dimension = (size + 4) * 2;
  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: CanvasRenderingContext2D | null = null;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = size + 4;
  const centerY = size + 4;
  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas: HTMLCanvasElement | null = document.getElementById(
      canvasId.current
    ) as HTMLCanvasElement;

    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", `${dimension}`);
      canvas.setAttribute("height", `${dimension}`);
      canvas.setAttribute("id", canvasId.current);
      document.getElementById(wheelId.current)?.appendChild(canvas);
    }
    canvas?.addEventListener("click", spin, false);
    canvasContext = canvas?.getContext("2d");
  };
  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      if (setDisableClose) {
        setDisableClose(true);
      }
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = window.setInterval(onTimerTick, timerDelay);
    }
  };
  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  // const drawSegment = (key: number, lastAngle: number, angle: number) => {
  //   if (!canvasContext) {
  //     return false;
  //   }
  //   const ctx = canvasContext;
  //   const value = segments[key];
  //   ctx.save();
  //   ctx.beginPath();
  //   ctx.moveTo(centerX, centerY);
  //   ctx.arc(centerX, centerY, size, lastAngle, angle, false);
  //   ctx.lineTo(centerX, centerY);
  //   ctx.closePath();
  //   ctx.fillStyle = segColors[key % segColors.length];
  //   ctx.fill();
  //   ctx.stroke();
  //   ctx.save();
  //   ctx.translate(centerX, centerY);
  //   ctx.rotate((lastAngle + angle) / 2);
  //   ctx.fillStyle = contrastColor;
  //   ctx.font = `bold ${fontSize} ${fontFamily}`;
  //   ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
  //   ctx.restore();
  // };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    if (!canvasContext) {
      return false;
    }
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key % segColors.length];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = `bold ${fontSize} ${fontFamily}`;

    // เพิ่มระยะทางเพื่อให้ข้อความอยู่ปลายของวงล้อ
    ctx.fillText(value.substring(0, 21), size / 1.5 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    if (!canvasContext) {
      return false;
    }
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = wheelColors.wheelFrame;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 31, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = wheelColors.centerCircleBG;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
    ctx.font = "medium 1rem " + fontFamily;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw a new circle (เส้นวงกลมใหม่)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 0, 0, PI2, false); // วาดวงกลมใหม่เล็กลง
    ctx.closePath();
    ctx.lineWidth = 0; // ความหนาของเส้นวงกลมใหม่
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // สีของเส้นวงกลมใหม่
    ctx.stroke();

    // Draw a new circle (เส้นวงกลมใหม่)
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, 54, 0, PI2, false);
    // ctx.closePath();
    // ctx.lineWidth = 0.5;
    // ctx.strokeStyle = "#000000";
    // ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = outlineWidth;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const drawNeedle = () => {
    if (!canvasContext) {
      return false;
    }
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "transparent";
    //สีสามเหลี่ยมกลางวงล้อ
    ctx.fillStyle = wheelColors.centerCircleBG;
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 39);
    ctx.lineTo(centerX - 10, centerY - 39);
    ctx.lineTo(centerX, centerY - 53);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
    if (isStarted) {
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
    }
  };

  const clear = () => {
    if (canvasContext) {
      canvasContext.clearRect(0, 0, dimension, dimension);
    }
  };

  return (
    <div id={wheelId.current}>
      <canvas
        id={canvasId.current}
        width={dimension}
        height={dimension}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
        }}
      />
    </div>
  );
};
export default WheelComponent;

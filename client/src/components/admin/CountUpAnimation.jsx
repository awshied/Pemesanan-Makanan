import { useEffect, useState } from "react";

export function CountUpAnimation(target, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(target);
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counter = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out

      const currentValue = Math.round(end * easedProgress);
      setValue(currentValue);

      if (currentFrame < totalFrames) {
        requestAnimationFrame(counter);
      }
    };

    requestAnimationFrame(counter);
  }, [target, duration]);

  return value;
}

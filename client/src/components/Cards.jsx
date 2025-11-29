import React, { useRef } from "react";
import { assets } from "../assets/data";

const Cards = ({ card, children, index }) => {
  const cardRefs = useRef([]);

  let frameAnimasi;

  const gerakanCursorMouse = (index) => (e) => {
    if (frameAnimasi) cancelAnimationFrame(frameAnimasi);

    frameAnimasi = requestAnimationFrame(() => {
      const card = cardRefs.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

      angle = (angle + 360) % 360;

      card.style.setProperty("--start", angle + 60);
    });
  };
  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={gerakanCursorMouse(index)}
      className="card bg-secondary card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column shadow-xl"
    >
      <div className="glow" />
      <div className="flex items-center justify-between gap-1 mb-5">
        <div className="hidden sm:flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <img src={assets.star} key={i} alt="rating" width={20} />
          ))}
        </div>
        <div className="flex items-center md:gap-2 gap-2">
          <img src={assets.location} width={16} />
          <p
            className="text-textColor font-medium text-md"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {card.location}
          </p>
        </div>
      </div>
      <div className="mb-5">
        <p
          className="text-textColor text-[16px]"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {card.review}
        </p>
      </div>
      {children}
    </div>
  );
};

export default Cards;

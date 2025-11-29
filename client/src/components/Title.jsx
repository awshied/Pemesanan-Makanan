import React from "react";

const Title = ({
  title1,
  title2,
  titleStyles,
  title1Styles,
  paraStyles,
  para,
}) => {
  return (
    <div className={`${titleStyles} flexCenter flex-col`}>
      <h3
        className={`${title1Styles} uppercase`}
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        {title1}
        <span className="font-light text-solidThree"> {title2}</span>
      </h3>
      <p
        className={`${paraStyles} max-w-lg mt-2 text-center`}
        style={{
          fontFamily: "var(--font-poppins)",
        }}
      >
        {para}
      </p>
    </div>
  );
};

export default Title;

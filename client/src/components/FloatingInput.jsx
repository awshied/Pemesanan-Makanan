import React, { useState } from "react";

const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon,
}) => {
  const [focused, setFocused] = useState(false);

  const isActive = focused || (value && value.length > 0);

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        className={`
          absolute left-0 
          transition-all duration-300 font-semibold
          ${
            isActive
              ? "-top-2 text-solidThree text-sm"
              : "top-1 text-textColor text-base"
          }
        `}
      >
        {label}
      </label>

      {/* Render sesuai type */}
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className="
            w-full bg-transparent text-textColor text-base
            border-b-2 border-textColor pb-2 pt-5 outline-none
            transition-all duration-300 focus:border-solidThree pr-10
            resize-none
          "
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            w-full bg-transparent text-textColor text-base
            border-b-2 border-textColor pb-2 pt-5 outline-none
            transition-all duration-300 focus:border-solidThree pr-10
          "
        />
      )}

      {/* Icon */}
      {icon && (
        <img
          src={icon}
          alt=""
          className={`absolute right-1 bottom-3 w-5 ${
            isActive ? "icon-active-yellow" : ""
          }`}
        />
      )}
    </div>
  );
};

export default FloatingInput;

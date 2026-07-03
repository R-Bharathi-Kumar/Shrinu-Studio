import React from "react";
import localFont from "next/font/local";

const florisha = localFont({
  src: [
    {
      path: "../app/fonts/florishabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function ShrinuStudio({ textSize }) {
  return (
    <div className={`${florisha.className}`}>
      <div className={`${textSize}`}>
        Shrinu <span className="text-[#FF9494]">Studio</span>
      </div>
    </div>
  );
}

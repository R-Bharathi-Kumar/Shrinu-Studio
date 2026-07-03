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

export default function UnqText({ text }) {
  return (
    <div className={`${florisha.className}`}>
      <h1 className="pt-1">{text}</h1>
    </div>
  );
}

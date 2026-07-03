import localFont from "next/font/local";
import "./globals.css";

const gatuzoFont = localFont({
  src: [
    {
      path: "./fonts/GCGatuzoDemo-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/GCGatuzoDemo-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/GCGatuzoDemo-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/GCGatuzoDemo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GCGatuzoDemo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GCGatuzoDemo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/GCGatuzoDemo-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata = {
  title: "Shrinu Studio",
  description:
    "Portfolio of a Post-Production Specialist with a strong background in video editing and motion graphics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${gatuzoFont.className}`}>
      <body className="min-h-full bg-[#000000]">{children}</body>
    </html>
  );
}

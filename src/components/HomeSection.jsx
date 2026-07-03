import React from "react";
import UnqText from "./UnqText";
import MuxVideo from "@mux/mux-video-react";

export default function HomeSection() {
  return (
    <div className="relative md:px-20 px-4 min-h-screen flex items-center justify-center -mt-19 overflow-hidden bg-black">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-50"
      >
        <source src="/Background.mp4" type="video/mp4" />
      </video> */}
      <MuxVideo
        playbackId="AjllGd00O9XamD0102oi7SAhJnhWRxtl7BdZLjNISx3Upc" // Just paste the ID, not the whole URL
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-50"
      />
      <div className="">
        <div className="sm:block md:hidden">
          <div className="text-[10vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference">
            <UnqText text={"Post-Production"} />
            <div className="flex items-center justify-between gap-4">
              <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
              <UnqText text={"Specialist"} />
              <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="text-[5.5vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference">
            <UnqText text={"Post-Production Specialist"} />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center justify-between md:gap-8 gap-2">
            <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
            <div className="text-[4vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference text-nowrap">
              <UnqText text={"Video Editor"} />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-full min-w-[3.5vw] max-w-[3.5vw] text-[#ff9494]"
              color={"currentColor"}
              fill={"none"}
            >
              <path
                d="M11 8L13 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M2 11C2 7.70017 2 6.05025 3.02513 5.02513C4.05025 4 5.70017 4 9 4H10C13.2998 4 14.9497 4 15.9749 5.02513C17 6.05025 17 7.70017 17 11V13C17 16.2998 17 17.9497 15.9749 18.9749C14.9497 20 13.2998 20 10 20H9C5.70017 20 4.05025 20 3.02513 18.9749C2 17.9497 2 16.2998 2 13V11Z"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
              <path
                d="M17 8.90585L17.1259 8.80196C19.2417 7.05623 20.2996 6.18336 21.1498 6.60482C22 7.02628 22 8.42355 22 11.2181V12.7819C22 15.5765 22 16.9737 21.1498 17.3952C20.2996 17.8166 19.2417 16.9438 17.1259 15.198L17 15.0941"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
            </svg>
            <div className="text-[4vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference text-nowrap">
              <UnqText text={"Motion Graphics"} />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-full min-w-[3.5vw] max-w-[3.5vw] text-[#FF9494]"
              color={"currentColor"}
              fill={"none"}
            >
              <path
                d="M12 16.0351V7.9649C12 6.0377 12 5.0741 12.5918 4.80895C13.1837 4.54379 13.9003 5.18631 15.3336 6.47136L19.8342 10.5065C20.6116 11.2035 21.0003 11.552 21.0003 12C21.0003 12.448 20.6116 12.7965 19.8342 13.4935L15.3336 17.5286C13.9003 18.8137 13.1837 19.4562 12.5918 19.1911C12 18.9259 12 17.9623 12 16.0351Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 16.0351V7.9649C3 6.0377 3 5.0741 3.59183 4.80895C4.18366 4.54379 4.9003 5.18631 6.33359 6.47136L10.8342 10.5065C11.6116 11.2035 12.0003 11.552 12.0003 12C12.0003 12.448 11.6116 12.7965 10.8342 13.4935L6.33359 17.5286C4.9003 18.8137 4.18366 19.4562 3.59183 19.1911C3 18.9259 3 17.9623 3 16.0351Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div className="sm:block md:hidden">
          <div className="flex items-center justify-center gap-4">
            <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
            <div className="text-[7vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference text-nowrap">
              <UnqText text={"Video Editor"} />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-full min-w-[7vw] max-w-[7vw] text-[#ff9494]"
              color={"currentColor"}
              fill={"none"}
            >
              <path
                d="M11 8L13 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M2 11C2 7.70017 2 6.05025 3.02513 5.02513C4.05025 4 5.70017 4 9 4H10C13.2998 4 14.9497 4 15.9749 5.02513C17 6.05025 17 7.70017 17 11V13C17 16.2998 17 17.9497 15.9749 18.9749C14.9497 20 13.2998 20 10 20H9C5.70017 20 4.05025 20 3.02513 18.9749C2 17.9497 2 16.2998 2 13V11Z"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
              <path
                d="M17 8.90585L17.1259 8.80196C19.2417 7.05623 20.2996 6.18336 21.1498 6.60482C22 7.02628 22 8.42355 22 11.2181V12.7819C22 15.5765 22 16.9737 21.1498 17.3952C20.2996 17.8166 19.2417 16.9438 17.1259 15.198L17 15.0941"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
            </svg>
            <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
            <div className="text-[7vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference text-nowrap">
              <UnqText text={"Motion Graphics"} />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-full min-w-[7vw] max-w-[7vw] text-[#FF9494]"
              color={"currentColor"}
              fill={"none"}
            >
              <path
                d="M12 16.0351V7.9649C12 6.0377 12 5.0741 12.5918 4.80895C13.1837 4.54379 13.9003 5.18631 15.3336 6.47136L19.8342 10.5065C20.6116 11.2035 21.0003 11.552 21.0003 12C21.0003 12.448 20.6116 12.7965 19.8342 13.4935L15.3336 17.5286C13.9003 18.8137 13.1837 19.4562 12.5918 19.1911C12 18.9259 12 17.9623 12 16.0351Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 16.0351V7.9649C3 6.0377 3 5.0741 3.59183 4.80895C4.18366 4.54379 4.9003 5.18631 6.33359 6.47136L10.8342 10.5065C11.6116 11.2035 12.0003 11.552 12.0003 12C12.0003 12.448 11.6116 12.7965 10.8342 13.4935L6.33359 17.5286C4.9003 18.8137 4.18366 19.4562 3.59183 19.1911C3 18.9259 3 17.9623 3 16.0351Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
          </div>
        </div>
        <div className="flex items-center justify-center md:gap-6 gap-4">
          <div className="md:h-4 h-1 md:min-w-26 md:max-w-26 w-full bg-[#FF9494]"></div>
          <div className="flex items-center">
            <div className="md:text-[4vw] text-[7vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference text-nowrap">
              <UnqText text={"St"} />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-full md:min-w-[3.5vw] md:max-w-[3.5vw] min-w-[7vw] max-w-[7vw] md:-mt-2 text-[#ff9494]"
              color={"currentColor"}
              fill={"none"}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></circle>
              <path
                d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M15.625 8.387V8.91649M8.375 8.387V8.91649M8.75 8.75C8.75 8.33579 8.58211 8 8.375 8C8.16789 8 8 8.33579 8 8.75C8 9.16421 8.16789 9.5 8.375 9.5C8.58211 9.5 8.75 9.16421 8.75 8.75ZM16 8.75C16 8.33579 15.8321 8 15.625 8C15.4179 8 15.25 8.33579 15.25 8.75C15.25 9.16421 15.4179 9.5 15.625 9.5C15.8321 9.5 16 9.16421 16 8.75Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div className="md:text-[4vw] text-[7vw] text-center font-bold text-[#F0F1FA] select-none mix-blend-difference text-nowrap">
              <UnqText text={"ryteller"} />
            </div>
          </div>
          <div className="md:h-4 h-1 w-full bg-[#FF9494]"></div>
          <img
            src="/Shrinu.png"
            alt=""
            className="h-full md:min-w-[3.5vw] md:max-w-[3.5vw] min-w-[6vw] max-w-[6vw] rounded-full md:border-4 border-[#FF9494] rotate-12"
          />
          <div className="md:h-4 h-1 w-full bg-[#FF9494]"></div>
        </div>
      </div>
    </div>
  );
}

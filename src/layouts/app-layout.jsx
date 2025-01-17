import React from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import Header from "@/components/header";
import { TextScramble } from "@/components/ui/text-scramble";

const AppLayout = () => {
  return (
    <>
      <div className="grid-background"></div>
      <main className="min-h-screen m-3">
        <Header />
        <Outlet />
      </main>
      {/* <div className="bg-zinc-800 flex w-full justify-center items-center pl-1 pr-1 pt-1 mt-1"> */}
      <div className="flex w-full justify-center items-center pl-1 pr-1 pt-1 mt-1 text-white hover:shadow-[0_0_10px_rgba(255,0,0,10)] transition-shadow duration-300">
        <TextScramble className="font-mono text-sm uppercase text-zinc-400 hover:text-white">
          First React Fullstack Project
        </TextScramble>
        {/* <div class="text-2xl font-bold text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-shadow duration-300">
          Hover me for a glow effect!
        </div> */}
        <img
          className="w-1/6 lg:w-12 relative right-1 max-w-14 object-contain duration-75"
          src="./footerPool.png"
          alt="footer pool"
        />
        {/* <ImageGlow
          radius={500}
          saturation={10}
          opacity={0.8}
          className="w-8 h-8" // Ensure the glow doesn't change the size
        >
          <img
            className="w-1/6 lg:w-12  right-1 hover:animate-spin max-w-14 object-contain"
            src="./footerPool.png"
            alt="footer pool"
          />
        </ImageGlow> */}
      </div>
    </>
  );
};

export default AppLayout;

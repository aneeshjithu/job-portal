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
      <div className="p-10 text-center bg-gray-800 mt-10">
        <TextScramble className="font-mono text-sm uppercase text-white">
          This is my first fullstack project in React 😊
        </TextScramble>
      </div>
    </>
  );
};

export default AppLayout;

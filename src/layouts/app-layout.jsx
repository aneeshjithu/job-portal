import { Outlet } from "react-router-dom";
import "../App.css";
import Header from "@/components/header";
import { TextScramble } from "@/components/ui/text-scramble";
import confetti from "canvas-confetti";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";

const AppLayout = () => {
  const handleConfettyClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#880808", "#EE4B2B", "#D22B2B", "#D2042D", "#E35335"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 5,
        angle: 70,
        spread: 70,
        startVelocity: 60,
        origin: { x: 0, y: 1 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        startVelocity: 60,
        origin: { x: 1, y: 1 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <>
      <div className="grid-background"></div>
      <main className="min-h-screen m-2">
        <Header />
        <Outlet />
      </main>

      <div className="flex w-full justify-center items-center pl-1 pr-1 pt-1 mt-1 text-white transition-shadow duration-300 relative">
        <TextScramble className="font-mono text-sm uppercase text-white hover:text-white">
          First React Fullstack Project
        </TextScramble>

        <img
          className="cursor-pointer w-1/6 lg:w-12 relative right-1 max-w-14 object-contain duration-75"
          src="./footerPool.png"
          alt="footer pool"
          onClick={handleConfettyClick}
        />
        <div className="absolute bottom-2 right-4 w-9 h-9 rounded-full flex items-center justify-center">
          <ModeToggle />
        </div>
      </div>

      <Toaster position="bottom-right" />
    </>
  );
};

export default AppLayout;

"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },

  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 5,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

const ShinyButton = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        {...animationProps}
        {...props}
        className={cn(
          // "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
          //"relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white shadow hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800",
          "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out bg-green-800 hover:bg-green-900 text-white shadow hover:shadow-lg dark:bg-green-700 dark:hover:bg-green-800",

          className
        )}
      >
        <span
          // className="relative block size-full text-sm  tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
          className="relative block size-full text-sm  tracking-wide text-[rgb(250,247,247)] dark:font-light dark:text-[rgb(255,254,254)]"
          style={{
            maskImage:
              "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            // mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";

export default ShinyButton;

"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "motion/react";
import React from "react";

export const ScrollProgress = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
      stiffness: 200,
      damping: 50,
      restDelta: 0.001,
    });

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] h-[3px]  origin-left bg-gradient-to-r from-[#fb5151] via-[#fb5151] to-[#fb5151]",
          className
        )}
        // #880808", "#EE4B2B", "#D22B2B", "#D2042D", "#E35335
        style={{
          scaleX,
        }}
        {...props}
      />
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";

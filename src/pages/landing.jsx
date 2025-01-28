import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import companies from "@/data/companies.json";
import faq from "@/data/faq.json";
import "../index.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { BorderTrail } from "@/components/ui/border-trail";
import { useEffect, useRef } from "react";

const LandingPage = () => {
  //const imageRef = useRef(null);

  // useEffect(() => {
  //   const imageElement = imageRef.current;

  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const scrollThreshold = 100;

  //     if (scrollPosition > scrollThreshold) {
  //       imageElement.classList.add("scrolled");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  // }, []);

  // const imageRef = useRef(null);

  // useEffect(() => {
  //   const imageElement = imageRef.current;

  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const scrollThreshold = 100;

  //     if (imageElement) {
  //       if (scrollPosition > scrollThreshold) {
  //         imageElement.classList.add("scrolled");
  //       } else {
  //         imageElement.classList.remove("scrolled");
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const imageRef = useRef(null);
  const sparkleContainerRef = useRef(null);

  const createSparkles = () => {
    if (!sparkleContainerRef.current) return;

    // Clear existing sparkles
    sparkleContainerRef.current.innerHTML = "";

    // Create new sparkles
    const sparkleCount = 15;
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle-particle";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 0.3}s`;
      sparkleContainerRef.current.appendChild(sparkle);
    }
  };

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 300;

      if (imageElement) {
        if (scrollPosition > scrollThreshold) {
          imageElement.classList.add("scrolled");
          createSparkles();
        } else {
          imageElement.classList.remove("scrolled");
          if (sparkleContainerRef.current) {
            sparkleContainerRef.current.innerHTML = "";
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main className="flex flex-col gap-10 sm:ga-20 py-10 sm:py-20">
      <section className="text-center">
        <h1
          className="flex items-center justify-center 
                gradient-title text-4xl font-extrabold 
                 sm:text-6xl lg:text-8xl tracking-tighter py-4 gap-0"
        >
          <div className="">
            <img
              src="./Logo.png"
              alt="test logo"
              className="h-14 sm:h-24 lg:h-32"
            />
          </div>

          <span>Shape Your Career With Us!</span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl font-semibold tracking-wide drop-shadow-lg">
          Let Deadpool handle the boring stuff—your dream job’s just a click
          away!
        </p>
      </section>
      <div className="flex justify-center gap-4">
        <Link to="./jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="./post-job">
          <Button variant="destructive" size="xl">
            Post Jobs
          </Button>
        </Link>
      </div>
      <div>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => {
              return (
                <CarouselItem key={id} className="basis-1/3 sm:basis-1/6">
                  <img src={path} alt={name} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
      {/* <div className="deadpool-rotate-wrapper mt-5 md:mt-0">
        <div ref={imageRef} className="deadpool-rotate">
          <img src="/deadpoolbanner.png" alt="banner pool" />
        </div>
      </div> */}
      <div className="deadpool-rotate-wrapper mt-5 md:mt-0">
        <div ref={imageRef} className="deadpool-rotate">
          <img src="/deadpoolbanner.png" alt="banner pool" />
          <div ref={sparkleContainerRef} className="sparkle-container" />
        </div>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 tracking-normal ">
        <div className="relative h-full w-full overflow-hidden rounded-md border border-zinc-950/10 bg-white text-zinc-700 outline-none dark:border-zinc-50/20 dark:bg-zinc-950 dark:text-zinc-300">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold  bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent tracking-wide drop-shadow-md">
                For Job Seekers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className=" tracking-tight bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent font-medium drop-shadow-md">
                Search and apply for jobs ,track applications,and more...
              </p>
            </CardContent>
          </Card>

          <BorderTrail
            className="bg-gradient-to-l from-red-200 via-red-500 to-red-200 dark:from-red-400 dark:via-red-500 dark:to-red-700"
            size={135}
          />
        </div>

        <div className=" relative h-full w-full overflow-hidden rounded-md border border-zinc-950/10 bg-white text-zinc-700 outline-none dark:border-zinc-50/20 dark:bg-zinc-950 dark:text-zinc-300">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent tracking-wide drop-shadow-md">
                For Employers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="tracking-tight bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent font-medium drop-shadow-md">
                Post jobs, manage applications, and find the best candidates
                with ease.
              </p>
            </CardContent>
          </Card>
          <BorderTrail
            className="bg-gradient-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
            size={135}
          />
        </div>
      </section>
      <Accordion
        className="flex w-full flex-col"
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        variants={{
          expanded: {
            opacity: 1,
            scale: 1,
          },
          collapsed: {
            opacity: 0,
            scale: 0.7,
          },
        }}
      >
        {faq.map(({ id, heading, question, answer }) => {
          return (
            <AccordionItem key={id} value={heading} className="py-2">
              <AccordionTrigger className="w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50 ">
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-[expanded]:rotate-90 dark:text-zinc-50" />
                  <div className="ml-2 text-zinc-950 dark:text-zinc-50">
                    <AnimatedShinyText shimmerWidth={100} className="">
                      <span className="text-red-800">{question}</span>
                    </AnimatedShinyText>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-1 pl-6 pr-2 text-white">{answer}</p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandingPage;

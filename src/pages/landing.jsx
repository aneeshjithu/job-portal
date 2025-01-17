import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import companies from "@/data/companies.json";
import faq from "@/data/faq.json";

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
import ImageGlow from "react-image-glow";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:ga-20 py-10 sm:py-20">
      <section className="text-center">
        <h1
          className="flex items-center justify-center 
                gradient-title text-4xl font-extrabold 
                 sm:text-6xl lg:text-8xl tracking-tighter py-4 gap-0"
        >
          <img
            src="./Logo.png"
            alt="test logo"
            className="h-14 sm:h-24 lg:h-32"
          />
          <span>Shape Your Career With Us!</span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Deadpool’s got your back-find your dream job with us today!
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

      <img src="/deadpoolbanner.png" alt="banner pool" />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 tracking-normal ">
        <div className="relative h-full w-full overflow-hidden rounded-md border border-zinc-950/10 bg-white text-zinc-700 outline-none dark:border-zinc-50/20 dark:bg-zinc-950 dark:text-zinc-300">
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Search and apply for jobs ,track applications,and more...</p>
            </CardContent>
          </Card>
          <BorderTrail
            className="bg-gradient-to-l from-red-200 via-red-500 to-red-200 dark:from-red-400 dark:via-red-500 dark:to-red-700"
            size={135}
          />
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-md border border-zinc-950/10 bg-white text-zinc-700 outline-none dark:border-zinc-50/20 dark:bg-zinc-950 dark:text-zinc-300">
          <Card>
            <CardHeader>
              <CardTitle> For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Post job,manage applications, and find the best candidate</p>
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
              <AccordionTrigger className="w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50">
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-[expanded]:rotate-90 dark:text-zinc-50" />
                  <div className="ml-2 text-zinc-950 dark:text-zinc-50">
                    <AnimatedShinyText shimmerWidth={100} className="">
                      <span>{question}</span>
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
